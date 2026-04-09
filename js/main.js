// Archivo principal que conecta todo

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar el HTML del modal (para no repetirlo en cada archivo)
    inyectarModalCarrito();

    // 2. Inicializar lógica del carrito
    actualizarContadorCarrito();
    inicializarModalCarrito();
    window.setupInputValidation?.();

    // 3. Inyectar contenedor de notificaciones
    inyectarToastContainer();

    // 4. Detectar si estamos en la página de tienda
    if (window.location.pathname.includes('tienda.html')) {
        renderizarTienda();
    }

    // 5. Detectar si estamos en la página de carrito completo
    if (document.getElementById('full-cart-items')) {
        renderizarPaginaCarrito();
    }

    // 6. Detectar si estamos en la página de detalle
    if (window.location.pathname.includes('producto-detalle.html')) {
        renderizarDetalleProducto();
    }

    // 7. Resaltar "Productos" en el nav si estamos en secciones dependientes (Tienda o Detalle)
    const path = window.location.pathname;
    if (path.includes('tienda.html') || path.includes('producto-detalle.html')) {
        const productosNavLink = document.querySelector('.nav-list a[href*="productos.html"]');
        if (productosNavLink) {
            productosNavLink.setAttribute('aria-current', 'page');
        }
    }
});

function inyectarModalCarrito() {
    // Si ya existe (por seguridad), no hacemos nada
    if (document.getElementById('cart-modal')) return;

    const modalHTML = `
    <div id="cart-modal" class="cart-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div class="cart-modal-content">
            <div class="cart-header">
                <h2 id="cart-title">Tu Carrito</h2>
                <button id="close-cart" class="close-btn" aria-label="Cerrar carrito">&times;</button>
            </div>
            <div id="cart-items" class="cart-items">
                <p class="cart-empty-msg">Tu carrito está vacío</p>
            </div>
            <!-- Región para anuncios de lectores de pantalla -->
            <div id="cart-status" class="sr-only" role="status" aria-live="polite"></div>
            <div class="cart-footer">
                <!-- Barra de progreso compra mínima -->
                <div id="min-purchase-container" class="min-purchase-container" aria-live="polite">
                    <!-- Se inyecta vía JS -->
                </div>
                <div class="cart-total">
                    <span>Total:</span>
                    <span>$<span id="cart-total-price">0</span></span>
                </div>
                <div class="cart-actions">
                    <button id="checkout-btn" class="btn btn-verde btn-block">Finalizar compra</button>
                    <button id="view-cart-btn" class="btn btn-outline btn-block">Ir al carrito</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// --- LÓGICA DEL CARRITO (UI) ---

function inicializarModalCarrito() {
    const cartBtn = document.getElementById('cart-btn');
    const modal = document.getElementById('cart-modal');
    // Buscar el botón de cierre dentro del modal recién creado
    const closeBtn = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartBtn && modal) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar saltos si es un link
            renderizarCarritoEnModal();
            abrirModal();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                cerrarModal();
            });
        }

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal();
        });

        // Ir al checkout directamente (Finalizar compra)
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (carrito.length === 0) return;
                const isPage = window.location.pathname.includes('/pages/');
                window.location.href = isPage ? './checkout.html' : './pages/checkout.html';
            });
        }

        // Ir a la página de carrito completa
        const viewCartBtn = document.getElementById('view-cart-btn');
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', () => {
                if (carrito.length === 0) return;
                const isPage = window.location.pathname.includes('/pages/');
                window.location.href = isPage ? './carrito.html' : './pages/carrito.html';
            });
        }
    }
}

function renderizarTienda() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const titulo = document.getElementById('titulo-categoria');
    const contenedor = document.getElementById('contenedor-productos');
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    // Resaltar botón de filtro activo
    botonesFiltro.forEach(btn => {
        btn.classList.remove('active');
        const url = btn.getAttribute('href');
        
        // Caso 'Todos' (sin categoría en URL)
        if (!categoria && (url === 'tienda.html' || url.endsWith('/tienda.html'))) {
            btn.classList.add('active');
        } 
        // Caso categoría específica
        else if (categoria && url.includes(`categoria=${categoria}`)) {
            btn.classList.add('active');
        }
    });
    // Actualizar título y breadcrumb
    if (categoria) {
        // Mapa de nombres amigables
        const nombresCategorias = {
            'ecologicas': 'Bolsas de tela',
            'composteras': 'Composteras',
            'personalizadas': 'Bolsas personalizadas',
            'papel': 'Bolsas de papel',
            'biodegradables': 'Bolsas biodegradables',
            'disenos': 'Bolsas con diseños'
        };

        // Usar el nombre del mapa o capitalizar si no existe
        const catName = nombresCategorias[categoria] || (categoria.charAt(0).toUpperCase() + categoria.slice(1));

        titulo.innerText = catName;

        // Actualizar breadcrumb si existe
        const breadcrumbCat = document.getElementById('breadcrumb-category');
        if (breadcrumbCat) {
            breadcrumbCat.innerText = catName;
        }
    }

    // Lógica de búsqueda
    const busqueda = params.get('search');
    let productosAmostrar = [];

    if (busqueda) {
        titulo.innerText = `Resultados para: "${busqueda}"`;
        const breadcrumbCat = document.getElementById('breadcrumb-category');
        if (breadcrumbCat) breadcrumbCat.innerText = "Búsqueda";

        productosAmostrar = obtenerProductosPorBusqueda(busqueda);
    } else {
        // Si no hay búsqueda, usamos la lógica de categoría (o todo)
        productosAmostrar = obtenerProductosPorCategoria(categoria);
    }

    // Limpiar contenedor
    contenedor.innerHTML = '';

    if (productosAmostrar.length === 0) {
        contenedor.innerHTML = '<div class="producto-vacio"><h3>No encontramos productos en esta categoría :(</h3><a href="./productos.html" class="btn btn-verde">Ver otras categorías</a></div>';
        return;
    }

    // Renderizar tarjetas
    productosAmostrar.forEach(info => {
        const article = document.createElement('article');
        article.classList.add('card', 'card-elevada');
        if (info.categoria) {
            article.classList.add(`cat-${info.categoria}`);
        }

        const esPersonalizada = info.categoria === 'personalizadas';
        const urlDestino = esPersonalizada ? `./contacto.html?form=quote` : `./producto-detalle.html?id=${info.id}`;
        const canQuickAdd = !esPersonalizada && typeof info.precio === 'number';

        let precioHTML = '';
        let botonHTML = '';

        if (typeof info.precio === 'string') {
            precioHTML = `<div class="card-price">${info.precio}</div>`;
            botonHTML = `<a href="${urlDestino}" class="btn btn-verde btn-block" aria-label="Pedir cotización de ${info.nombre}">Pedir cotización</a>`;
        } else {
            precioHTML = `<div class="card-price">$${info.precio.toLocaleString()}</div>`;
            botonHTML = `<a href="${urlDestino}" class="btn btn-verde btn-block" aria-label="Ver detalle de ${info.nombre}">Ver detalles</a>`;
        }

        // Determinar icono del carrito
        const cartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

        let containerClass = 'card-img-container';
        if (info.categoria === 'composteras') {
            containerClass += ' is-wide';
        }

        const innerImgHTML = `
            <div class="img-zoom-wrapper">
                <img src="../${info.imagen}" alt="${info.nombre}">
            </div>`;

        const finalImgHTML = `<div class="${containerClass}">${innerImgHTML}</div>`;

        const partes = info.nombre.split(/\s*-\s*/);
        const nombreLimpio = partes[0];
        const detalleExtra = info.subtitulo || partes[1] || '';

        article.innerHTML = `
            <a href="${urlDestino}" class="card-img-link">${finalImgHTML}</a>
            <div class="card-body">
                <a href="${urlDestino}" class="card-title-link"><h4>${nombreLimpio}</h4></a>
                ${precioHTML}
                <p>${detalleExtra || info.descripcion}</p>
                
                ${canQuickAdd ? `
                    <div class="quick-buy-wrapper" data-id="${info.id}">
                        <!-- El contenido se genera dinámicamente -->
                    </div>
                ` : ''}

                <div class="card-controls">
                    ${botonHTML}
                </div>
            </div>
        `;

        contenedor.appendChild(article);
        if (canQuickAdd) {
            window.actualizarControlCompraRapida(info.id);
        }
    });

    // Delegación de eventos para Compra Rápida (Versión Híbrida)
    contenedor.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.quick-buy-wrapper');
        if (!wrapper) return;

        const id = wrapper.dataset.id;
        const btnToggle = e.target.closest('.btn-toggle-quick');
        const btnMinus = e.target.closest('.qty-minus');
        const btnPlus = e.target.closest('.qty-plus');

        if (btnToggle) {
            // Pasar a modo edición
            window.renderizarEstadoEdicion(wrapper, id);
        }

        if (btnMinus) {
            if (typeof window.restarEnCarrito === 'function') {
                window.restarEnCarrito(id);
                // La sincronización automática actualizará el número
                window.reiniciarTemporizadorCierre(wrapper, id);
            }
        }

        if (btnPlus) {
            if (typeof window.sumarEnCarrito === 'function') {
                window.sumarEnCarrito(id);
                window.reiniciarTemporizadorCierre(wrapper, id);
            }
        }
    });
}

// --- UTILIDADES COMPRA RÁPIDA (HÍBRIDA) ---

window.obtenerCantidadEnCarrito = (id) => {
    const item = (typeof carrito !== 'undefined' ? carrito : []).find(p => p.id === id);
    return item ? item.cantidad : 0;
};

window.actualizarCantidadesTienda = () => {
    const wrappers = document.querySelectorAll('.quick-buy-wrapper');
    wrappers.forEach(w => {
        // Solo actualizamos si NO está en modo edición (para no interrumpir al usuario)
        if (!w.classList.contains('is-editing')) {
            window.actualizarControlCompraRapida(w.dataset.id);
        } else {
            // Si está en edición, solo actualizamos el numerito del medio
            const valEl = w.querySelector('.qty-val');
            if (valEl) valEl.innerText = window.obtenerCantidadEnCarrito(w.dataset.id);
        }
    });
};

window.actualizarControlCompraRapida = (id) => {
    const wrapper = document.querySelector(`.quick-buy-wrapper[data-id="${id}"]`);
    if (!wrapper) return;

    const cant = window.obtenerCantidadEnCarrito(id);
    const cartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`;

    wrapper.classList.remove('is-editing');
    
    if (cant === 0) {
        wrapper.innerHTML = `<button class="btn-toggle-quick state-empty" aria-label="Agregar al carrito">${cartIcon}</button>`;
    } else {
        wrapper.innerHTML = `<button class="btn-toggle-quick state-badge" aria-label="Editar cantidad">${cant}</button>`;
    }
};

window.renderizarEstadoEdicion = (wrapper, id) => {
    const cant = window.obtenerCantidadEnCarrito(id);
    // Si era 0, al abrir usamos agregarAlCarrito para inicializar el producto
    if (cant === 0 && typeof window.agregarAlCarrito === 'function') {
        window.agregarAlCarrito(id, 1);
    }
    
    wrapper.classList.add('is-editing');
    wrapper.innerHTML = `
        <div class="quick-qty-selector">
            <button class="qty-minus">−</button>
            <span class="qty-val">${window.obtenerCantidadEnCarrito(id) || 1}</span>
            <button class="qty-plus">+</button>
        </div>
    `;

    window.reiniciarTemporizadorCierre(wrapper, id);
};

// Mapa para guardar temporizadores por ID
const timersTienda = {};

window.reiniciarTemporizadorCierre = (wrapper, id) => {
    if (timersTienda[id]) clearTimeout(timersTienda[id]);
    
    timersTienda[id] = setTimeout(() => {
        window.actualizarControlCompraRapida(id);
        delete timersTienda[id];
    }, 2000); // 2 segundos de inactividad
};

function renderizarDetalleProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const contenedor = document.getElementById('product-detail-container');

    if (!id || !contenedor) return;

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        contenedor.innerHTML = `
            <div class="text-center p-5">
                <h2>Producto no encontrado</h2>
                <a href="./tienda.html" class="btn btn-verde">Volver a la tienda</a>
            </div>
        `;
        return;
    }

    const pathBase = window.location.pathname.includes('/pages/') ? '../' : './';
    
    // Preparar características
    const featuresHTML = producto.caracteristicas 
        ? `<ul>${producto.caracteristicas.map(f => `<li>${f}</li>`).join('')}</ul>`
        : `<p>${producto.descripcion}</p>`;

    // Preparar el Badge de categoría (amigable)
    const nombresCategorias = {
        'ecologicas': 'Bolsas de tela',
        'composteras': 'Composteras',
        'personalizadas': 'Personalizadas',
        'papel': 'Bolsas de papel',
        'biodegradables': 'Biodegradables',
        'disenos': 'Bolsas con diseños'
    };
    const catName = nombresCategorias[producto.categoria] || producto.categoria;

    contenedor.innerHTML = `
        <div class="product-detail-header">
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <a href="${pathBase}index.html">Inicio</a> <span class="separator">/</span>
                <a href="${pathBase}pages/tienda.html">Tienda</a> <span class="separator">/</span>
                <span class="current">${producto.nombre}</span>
            </nav>

            <p class="min-purchase-alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon-info">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <strong>Venta Mayorista</strong> - Compra mínima: $15.000
            </p>
        </div>

        <div class="product-detail-grid">
            <div class="product-image-box">
                <img src="${pathBase}${producto.imagen}" alt="${producto.nombre}">
            </div>
            
            <div class="product-info-box">
                <span class="category-tag">${catName}</span>
                <h1>${producto.nombre}</h1>
                ${producto.subtitulo ? `<span class="pack-subtitle">${producto.subtitulo}</span>` : ''}
                
                <div class="price-large">
                    $${typeof producto.precio === 'number' ? producto.precio.toLocaleString() : producto.precio}
                    ${producto.categoria !== 'composteras' && typeof producto.precio === 'number' ? 
                        `<span class="price-notice">Precio por pack</span>` : ''}
                </div>
                
                <div class="product-features">
                    <h3>Características</h3>
                    ${featuresHTML}
                </div>

                <div class="purchase-controls">
                    <div class="qty-and-hint">
                        <div class="quantity-controls">
                            <button type="button" id="btn-minus">−</button>
                            <span id="qty-value">1</span>
                            <button type="button" id="btn-plus">+</button>
                        </div>
                        <span id="min-purchase-hint" class="min-purchase-hint"></span>
                    </div>
                    <button class="btn btn-verde btn-add-cart" id="btn-add-to-cart">
                        Agregar al carrito
                    </button>
                </div>

                <div class="trust-badges">
                    <div class="badge-item badge-sprout">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Tallo -->
                            <path d="M12 22C12 17 12 10 12 10" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
                            <!-- Hoja Izquierda -->
                            <path d="M12 14C12 14 7 14 5 11C3 8 6 5 12 10" fill="#4CAF50"/>
                            <!-- Hoja Derecha -->
                            <path d="M12 12C12 12 17 12 19 9C21 6 18 3 12 10" fill="#81C784"/>
                        </svg>
                        Producto sustentable
                    </div>
                    <div class="badge-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                        Envíos a todo el país
                    </div>
                    <div class="badge-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Envío: 3 a 5 días hábiles
                    </div>
                </div>
            </div>
        </div>
    `;

    // Lógica del selector de cantidad
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    const qtyValue = document.getElementById('qty-value');
    const btnAdd = document.getElementById('btn-add-to-cart');

    window.actualizarHint = () => {
        const totalActual = typeof calcularTotal === 'function' ? calcularTotal() : 0;
        const hintEl = document.getElementById('min-purchase-hint');
        const minCompra = typeof MIN_COMPRA !== 'undefined' ? MIN_COMPRA : 15000;
        
        if (hintEl) {
            if (totalActual < minCompra) {
                const falta = minCompra - totalActual;
                hintEl.innerText = `Faltan $${falta.toLocaleString()} para el mínimo`;
                hintEl.classList.remove('reached');
            } else {
                hintEl.innerText = `¡Llegaste al mínimo!`;
                hintEl.classList.add('reached');
            }
        }
    };

    if (btnMinus && btnPlus && qtyValue) {
        btnMinus.addEventListener('click', () => {
            let current = parseInt(qtyValue.innerText);
            if (current > 1) qtyValue.innerText = current - 1;
        });
        btnPlus.addEventListener('click', () => {
            let current = parseInt(qtyValue.innerText);
            qtyValue.innerText = current + 1;
        });

        // Inicializar hint al cargar
        actualizarHint();
    }

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            agregarAlCarrito(producto.id, qtyValue.innerText);
            // Actualizar el hint tras sumar al carrito
            actualizarHint();
        });
    }
}

function inyectarToastContainer() {
    if (document.getElementById('toast-container')) return;
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
}

// Función global para mostrar notificaciones sutiles
window.mostrarToast = (mensaje) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${mensaje}</span>
    `;

    container.appendChild(toast);

    // Se elimina automáticamente tras 3 segundos (coincidiendo con la animación CSS)
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
};

// --- VALIDACIÓN DE ENTRADA PROACTIVA ---

window.setupInputValidation = () => {
    const inputs = document.querySelectorAll('input[data-valid]');
    
    inputs.forEach(input => {
        const type = input.dataset.valid; // "letters" o "numbers"
        const parent = input.closest('.form-group') || input.parentElement;
        
        // Crear el mensaje de error si no existe
        let hint = parent.querySelector('.input-error-hint');
        if (!hint) {
            hint = document.createElement('span');
            hint.className = 'input-error-hint';
            hint.innerText = type === 'numbers' ? 'Solo números y símbolos (+, -, /)' : 'Solo se permiten letras';
            parent.appendChild(hint);
        }

        input.addEventListener('input', (e) => {
            const val = e.target.value;
            // Unificamos regex para incluir '/' (para fechas de vencimiento)
            let regex = type === 'numbers' ? /[^0-9+\s\-\/]/g : /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g;
            
            if (regex.test(val)) {
                // Si hay caracteres inválidos, los removemos
                e.target.value = val.replace(regex, '');
                // Mostramos el aviso visual
                hint.classList.add('visible');
                input.classList.add('is-invalid');
                
                // Lo ocultamos automáticamente tras 2 segundos si no vuelve a fallar
                if (input.dataset.timer) clearTimeout(input.dataset.timer);
                input.dataset.timer = setTimeout(() => {
                    hint.classList.remove('visible');
                    // Solo quitamos is-invalid si no está vacío (campo obligatorio)
                    if (input.value.trim() !== '') {
                        input.classList.remove('is-invalid');
                    }
                }, 2000);
            } else {
                // Si el campo está bien y no está vacío, limpiamos errores
                if (val.trim() !== '') {
                    hint.classList.remove('visible');
                    input.classList.remove('is-invalid');
                }
            }
        });
    });
};
