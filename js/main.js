// Archivo principal que conecta todo

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar el HTML del modal (para no repetirlo en cada archivo)
    inyectarModalCarrito();

    // 2. Inicializar lógica del carrito
    actualizarContadorCarrito();
    inicializarModalCarrito();

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
        // Add category class for specific styling
        if (info.categoria) {
            article.classList.add(`cat-${info.categoria}`);
        }

        // Lógica condicional para precio y botón
        let precioHTML = '';
        let botonHTML = '';

        if (typeof info.precio === 'string') {
            // Caso: Precio es texto (ej: "Pedir cotización")
            precioHTML = `<div class="card-price">${info.precio}</div>`;
            botonHTML = `<a href="./contacto.html?form=quote" class="btn btn-verde btn-block" aria-label="Pedir cotización de ${info.nombre}">Pedir cotización</a>`;
        } else {
            // Caso: Precio es número
            precioHTML = `<div class="card-price">$${info.precio.toLocaleString()}</div>`;
            botonHTML = `<button class="btn btn-verde btn-block" onclick="agregarAlCarrito('${info.id}')" aria-label="Agregar ${info.nombre} al carrito">Agregar al carrito</button>`;
        }

        // Check if the product needs a zoom wrapper (e.g., composteras)
        let imgHTML = `<img src="../${info.imagen}" alt="${info.nombre}">`;

        // Lógica de contenedor de imagen
        let containerClass = 'card-img-container';
        if (info.categoria === 'composteras') {
            containerClass += ' is-wide';
        }

        let innerHTML = `
            <div class="img-zoom-wrapper">
                <img src="../${info.imagen}" alt="${info.nombre}">
            </div>`;

        const finalImgHTML = `<div class="${containerClass}">${innerHTML}</div>`;

        // Separar Nombre - Cantidad (Regex robusto)
        const partes = info.nombre.split(/\s*-\s*/);
        const nombreLimpio = partes[0];
        const detalleExtra = partes[1] || '';

        article.innerHTML = `
            ${finalImgHTML}
            <div class="card-body">
                <h4>${nombreLimpio}</h4>
                ${precioHTML}
                <p>${detalleExtra || info.descripcion}</p>
                <div class="card-controls">
                    ${botonHTML}
                </div>
            </div>
        `;

        contenedor.appendChild(article);
    });
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
