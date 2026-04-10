const MIN_ENVIO_GRATIS = 50000;
const MIN_COMPRA = window.MIN_COMPRA;

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// SEGURIDAD: Limpieza de datos corruptos en el arranque (Best Practice)
carrito = carrito.filter(item => item && item.id && item.nombre);
localStorage.setItem('carrito', JSON.stringify(carrito));

// --- UTILIDADES ---

/**
 * Obtiene la ruta base según la ubicación del archivo HTML
 */
const obtenerPathBase = window.obtenerPathBase;

/**
 * Formatea un número como moneda local
 */
const formatearPrecio = (valor) => `$${valor.toLocaleString()}`;

/**
 * Genera el HTML para una barra de progreso premium
 */
const generarHTMLBarraProgreso = (valorActual, meta, mensaje, esExito = false) => {
    const porcentaje = Math.min((valorActual / meta) * 100, 100);
    const claseReached = esExito ? 'reached' : '';
    
    return `
        <div class="cart-progress-container">
            <span class="progress-label" ${esExito ? 'style="color: var(--c-brand); font-weight: 700;"' : ''}>
                ${mensaje}
            </span>
            <div class="progress-track">
                <div class="progress-fill ${claseReached}" style="width: ${porcentaje}%"></div>
            </div>
        </div>
    `;
};

// --- LÓGICA DE DATOS ---

window.guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Sincronizar grilla de tienda si existe la función
    if (typeof window.actualizarCantidadesTienda === 'function') {
        window.actualizarCantidadesTienda();
    }
    
    // Actualizar vistas si están en el DOM
    const renderizadores = [
        window.renderizarCarritoEnModal, 
        window.renderizarPaginaCarrito,
        window.actualizarHint
    ];
    renderizadores.forEach(render => {
        if (typeof render === 'function') render();
    });
};

window.agregarAlCarrito = (idProducto, cantidad = 1) => {
    const numCant = parseInt(cantidad);
    const producto = productos.find(p => p.id === idProducto);
    
    if (!producto) {
        console.error(`Producto con ID ${idProducto} no encontrado en la base de datos.`);
        return;
    }

    const itemEnCarrito = carrito.find(p => p.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += numCant;
    } else {
        carrito.push({ ...producto, cantidad: numCant });
    }

    guardarCarrito();
    if (window.mostrarToast) window.mostrarToast(`¡Agregaste ${producto.nombre} al carrito!`);
    
    // Anuncio para lectores de pantalla
    if (typeof anunciarParaScreenReader === 'function') {
        const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        anunciarParaScreenReader(`Agregaste ${producto.nombre} al carrito. Ahora tenés ${totalItems} ítems en total.`);
    }
};

window.eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(p => p.id !== idProducto);
    guardarCarrito();
};

window.calcularTotal = () => carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
const calcularTotal = window.calcularTotal;

const actualizarContadorCarrito = () => {
    const contador = document.getElementById('cart-count');
    if (!contador) return;

    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.innerText = totalItems;
    contador.style.display = totalItems > 0 ? 'inline-flex' : 'none';

    const parent = contador.parentElement;
    if (parent) {
        parent.classList.add('pulse-anim');
        setTimeout(() => parent.classList.remove('pulse-anim'), 300);
    }
};

// --- VISTAS (UI) ---

window.renderizarCarritoEnModal = () => {
    const contenedor = document.getElementById('cart-items');
    const precioTotalEl = document.getElementById('cart-total-price');
    const minPurchaseArea = document.getElementById('min-purchase-container');
    const btnCheckout = document.getElementById('checkout-btn');

    if (!contenedor || !precioTotalEl) return;
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="cart-empty-msg">Tu carrito está vacío</p>';
        precioTotalEl.innerText = '0';
        if (minPurchaseArea) minPurchaseArea.innerHTML = '';
        if (btnCheckout) btnCheckout.classList.add('btn-disabled');
        return;
    }

    const path = obtenerPathBase();
    carrito.forEach(prod => {
        // SEGURIDAD: Si no tiene nombre (dato corrupto), lo salteamos
        if (!prod || !prod.nombre) return;

        // Regex robusto para separar Nombre - Detalle
        const partes = prod.nombre.split(/\s*-\s*/);
        const nombreLimpio = partes[0];
        const infoExtra = partes[1] || '';
        
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <img src="${path}${prod.imagen}" alt="Fotografía de ${nombreLimpio}">
            <div class="item-details">
                <h5>${nombreLimpio}</h5>
                ${infoExtra ? `<div class="text-muted small">${infoExtra}</div>` : ''}
                <div class="item-controls-wrapper">
                    <div class="quantity-controls">
                        <button onclick="restarEnCarrito('${prod.id}')" aria-label="Disminuir cantidad de ${nombreLimpio}">−</button>
                        <span aria-live="polite">${prod.cantidad}</span>
                        <button onclick="sumarEnCarrito('${prod.id}')" aria-label="Aumentar cantidad de ${nombreLimpio}">+</button>
                    </div>
                    <span class="item-price-unit">x ${formatearPrecio(prod.precio)}</span>
                </div>
            </div>
            <div class="item-actions">
                <button onclick="eliminarDelCarrito('${prod.id}')" class="delete-btn" aria-label="Eliminar ${nombreLimpio} del carrito" title="Eliminar">&times;</button>
                <div class="item-total">${formatearPrecio(prod.precio * prod.cantidad)}</div>
            </div>
        `;
        contenedor.appendChild(item);
    });

    const total = calcularTotal();
    precioTotalEl.innerText = total.toLocaleString();

    if (minPurchaseArea) {
        if (total < MIN_COMPRA) {
            const falta = MIN_COMPRA - total;
            minPurchaseArea.innerHTML = generarHTMLBarraProgreso(total, MIN_COMPRA, `Te faltan ${formatearPrecio(falta)} para el mínimo`);
            if (btnCheckout) btnCheckout.classList.add('btn-disabled');
        } else {
            minPurchaseArea.innerHTML = generarHTMLBarraProgreso(total, MIN_COMPRA, '¡Llegaste al mínimo de compra!', true);
            if (btnCheckout) btnCheckout.classList.remove('btn-disabled');
        }
    }
};

window.renderizarPaginaCarrito = () => {
    const contenedor = document.getElementById('full-cart-items');
    const subtotalEl = document.querySelector('.subtotal-val');
    const totalEl = document.querySelector('.total-val');
    const envioEl = document.querySelector('.envio-val');
    const promoArea = document.getElementById('shipping-promo-container-cart');
    const btnContinuar = document.querySelector('button[onclick*="validarYRedirigirCheckout"]');

    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<div class="text-center p-5"><p>Tu carrito está vacío.</p><a href="./tienda.html" class="btn btn-verde">Ir a la tienda</a></div>';
        if (subtotalEl) subtotalEl.innerText = '$0';
        if (totalEl) totalEl.innerText = '$0';
        if (envioEl) envioEl.innerText = 'A calcular';
        if (promoArea) promoArea.innerHTML = '';
        if (btnContinuar) btnContinuar.classList.add('btn-disabled');
        return;
    }

    const path = obtenerPathBase();
    carrito.forEach(prod => {
        // SEGURIDAD: Protección contra datos incompletos
        if (!prod || !prod.nombre) return;

        const partes = prod.nombre.split(/\s*-\s*/);
        const nombreLimpio = partes[0];
        const infoExtra = partes[1] || '';
        
        const item = document.createElement('article');
        item.className = 'cart-page-item';
        item.innerHTML = `
            <img src="${path}${prod.imagen}" alt="Fotografía de ${nombreLimpio}">
            <div class="cart-item-info">
                <h4>${nombreLimpio}</h4>
                ${infoExtra ? `<div class="text-muted small mb-1">${infoExtra}</div>` : ''}
                <div class="unit-price">Precio unitario: ${formatearPrecio(prod.precio)}</div>
            </div>
            <div class="cart-item-qty">
                <div class="quantity-controls">
                    <button onclick="restarEnCarrito('${prod.id}')" aria-label="Disminuir cantidad de ${nombreLimpio}">−</button>
                    <span aria-live="polite">${prod.cantidad}</span>
                    <button onclick="sumarEnCarrito('${prod.id}')" aria-label="Aumentar cantidad de ${nombreLimpio}">+</button>
                </div>
            </div>
            <div class="cart-item-total-price">${formatearPrecio(prod.precio * prod.cantidad)}</div>
            <div class="cart-item-action">
                <button onclick="eliminarDelCarrito('${prod.id}')" class="delete-icon-btn" aria-label="Eliminar ${nombreLimpio} del carrito" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </div>
        `;
        contenedor.appendChild(item);
    });

    const subtotalValue = calcularTotal();
    if (subtotalEl) subtotalEl.innerText = formatearPrecio(subtotalValue);
    if (totalEl) totalEl.innerText = formatearPrecio(subtotalValue);

    if (promoArea) {
        let htmlExtra = '';
        if (subtotalValue < MIN_ENVIO_GRATIS) {
            const faltaEnvio = MIN_ENVIO_GRATIS - subtotalValue;
            htmlExtra += generarHTMLBarraProgreso(subtotalValue, MIN_ENVIO_GRATIS, `Te faltan ${formatearPrecio(faltaEnvio)} para el ENVÍO GRATIS`);
            if (envioEl) envioEl.innerText = 'A calcular';
        } else {
            if (envioEl) envioEl.innerHTML = '<span style="color:var(--c-brand); font-weight:700;">¡Gratis!</span>';
        }

        if (subtotalValue < MIN_COMPRA) {
            const faltaMin = MIN_COMPRA - subtotalValue;
            htmlExtra += `<div class="min-purchase-warning">⚠️ Te faltan ${formatearPrecio(faltaMin)} para el mínimo de compra</div>`;
            if (btnContinuar) btnContinuar.classList.add('btn-disabled');
        } else {
            if (btnContinuar) btnContinuar.classList.remove('btn-disabled');
        }
        promoArea.innerHTML = htmlExtra;
    }
};

// --- ACCIONES SECUNDARIAS ---

window.sumarEnCarrito = (id) => {
    const item = carrito.find(p => p.id === id);
    if (item) { item.cantidad++; guardarCarrito(); }
};

window.restarEnCarrito = (id) => {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    if (item.cantidad > 1) {
        item.cantidad--;
        guardarCarrito();
    } else {
        // Si es 1 y se resta, eliminamos el producto
        eliminarDelCarrito(id);
    }
};

window.validarYRedirigirCheckout = () => {
    const total = calcularTotal();
    if (carrito.length === 0 || total < MIN_COMPRA) return;
    
    // Corregir ruta dinámica
    const isInsidePages = window.location.pathname.includes('/pages/');
    window.location.href = isInsidePages ? './checkout.html' : './pages/checkout.html';
};

const abrirModal = () => document.getElementById('cart-modal')?.classList.add('active');
const cerrarModal = () => document.getElementById('cart-modal')?.classList.remove('active');
