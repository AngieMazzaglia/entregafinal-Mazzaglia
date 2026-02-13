// Archivo principal que conecta todo

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar el HTML del modal (para no repetirlo en cada archivo)
    inyectarModalCarrito();

    // 2. Inicializar lógica del carrito
    actualizarContadorCarrito();
    inicializarModalCarrito();

    // 3. Detectar si estamos en la página de tienda
    if (window.location.pathname.includes('tienda.html')) {
        renderizarTienda();
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
                <div class="cart-total">Total: $<span id="cart-total-price">0</span></div>
                <div class="cart-actions">
                    <button id="checkout-btn" class="btn btn-verde btn-block">Finalizar Compra</button>
                    <button id="empty-cart-btn" class="btn btn-outline btn-block">Vaciar Carrito</button>
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

        // Finalizar compra (Checkout simulado)
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (carrito.length === 0) return;
                alert('¡Gracias por tu compra! (Simulación)');
                carrito = [];
                guardarCarrito();
                cerrarModal();
                actualizarContadorCarrito();
            });
        }

        // Vaciar carrito
        const emptyBtn = document.getElementById('empty-cart-btn');
        if (emptyBtn) {
            emptyBtn.addEventListener('click', () => {
                if (carrito.length === 0) return;
                if (confirm('¿Estás seguro que querés vaciar el carrito?')) {
                    carrito = [];
                    guardarCarrito();
                    renderizarCarritoEnModal(); // Re-renderizar para mostrar vacío
                    actualizarContadorCarrito();
                }
            });
        }
    }
}

function renderizarTienda() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    const titulo = document.getElementById('titulo-categoria');
    const contenedor = document.getElementById('contenedor-productos');

    // Actualizar título y breadcrumb
    // Actualizar título y breadcrumb
    if (categoria) {
        // Mapa de nombres amigables
        const nombresCategorias = {
            'ecologicas': 'Bolsas ecológicas',
            'composteras': 'Composteras',
            'personalizadas': 'Bolsas personalizadas',
            'papel': 'Bolsas de papel',
            'biodegradables': 'Bolsas biodegradables',
            'diseños': 'Bolsas con diseños'
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

        // IDs for zoom logic
        const simpleZoomIds = ['comp-02']; // Compostera simple (User likes this one as is)
        const wideZoomIds = ['comp-01', 'comp-03', 'comp-04', 'comp-05']; // Double & Kits (User wants wider area)

        let finalImgHTML = '';

        if (simpleZoomIds.includes(info.id)) {
            // Standard centered zoom inside card-img-container (as before)
            let inner = `
            <div class="img-zoom-wrapper" style="height:100%; display:flex; align-items:center; justify-content:center;">
                <img src="../${info.imagen}" alt="${info.nombre}" class="img-zoom-large" style="height:auto; max-height:100%;">
            </div>`;
            finalImgHTML = `<div class="card-img-container">${inner}</div>`;
        } else if (wideZoomIds.includes(info.id)) {
            // Wider container: negative margins to use full card width
            finalImgHTML = `
            <div class="img-zoom-wrapper-wide" style="margin: -12px -12px 12px -12px; height: 232px; display:flex; align-items:center; justify-content:center; border-radius: 12px 12px 0 0; overflow:hidden; background-color:#fff;">
                 <img src="../${info.imagen}" alt="${info.nombre}" class="img-zoom-large" style="height:auto; max-height:90%; width: auto; max-width: 95%;">
            </div>`;
        } else {
            // Standard product
            finalImgHTML = `<div class="card-img-container"><img src="../${info.imagen}" alt="${info.nombre}"></div>`;
        }

        article.innerHTML = `
            ${finalImgHTML}
            <h4>${info.nombre}</h4>
            ${precioHTML}
            <p>${info.descripcion}</p>
            <div class="card-controls">
                ${botonHTML}
            </div>
        `;

        contenedor.appendChild(article);
    });
}
