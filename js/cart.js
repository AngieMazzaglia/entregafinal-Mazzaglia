// Lógica del Carrito 3.0 (Versión Clean Code) 🛒✨

/**
 * CONFIGURACIÓN Y CONSTANTES
 */
// CONFIGURACIÓN Y CONSTANTES (Consumidas desde window.data.js)
const MIN_COMPRA = window.MIN_COMPRA;
const MIN_ENVIO_GRATIS = window.MIN_ENVIO_GRATIS;

let carrito = [];
try {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} catch (e) {
    console.error("Error al leer el carrito de localStorage:", e);
    carrito = [];
}

// Seguridad: Limpieza de datos corruptos al arrancar
carrito = carrito.filter(item => item && item.id && item.nombre);
localStorage.setItem('carrito', JSON.stringify(carrito));

const obtenerPathBase = window.obtenerPathBase;
const formatearPrecio = window.formatearPrecio;

// --- LÓGICA DE DATOS ---

window.guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Sincronizar grilla de tienda
    if (typeof window.actualizarCantidadesTienda === 'function') {
        window.actualizarCantidadesTienda();
    }
    
    // Actualizar todas las vistas vinculadas
    [window.renderizarCarritoEnModal, window.renderizarPaginaCarrito, window.actualizarHint].forEach(render => {
        if (typeof render === 'function') render();
    });
};

window.agregarAlCarrito = (idProducto, cantidad = 1) => {
    const numCant = parseInt(cantidad);
    const producto = productos.find(p => p.id === idProducto);
    
    if (!producto) return console.error(`ID ${idProducto} no encontrado.`);

    const itemEnCarrito = carrito.find(p => p.id === idProducto);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += numCant;
    } else {
        carrito.push({ ...producto, cantidad: numCant });
    }

    window.guardarCarrito();
    if (window.mostrarToast) window.mostrarToast(`¡Agregaste ${producto.nombre} al carrito!`);
};

window.eliminarDelCarrito = (idProducto) => {
    carrito = carrito.filter(p => p.id !== idProducto);
    window.guardarCarrito();
};

window.calcularTotal = () => carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

const actualizarContadorCarrito = () => {
    const contador = document.getElementById('cart-count');
    if (!contador) return;

    const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.innerText = totalItems;
    contador.style.display = totalItems > 0 ? 'inline-flex' : 'none';
};

// --- COMPONENTES UI (HTML snippets) ---

/**
 * Genera la barra de progreso para promociones
 */
const generarHTMLBarraProgreso = (valorActual, meta, mensaje, esExito = false) => {
    const porcentaje = Math.min((valorActual / meta) * 100, 100);
    return `
        <div class="cart-progress-container">
            <span class="progress-label" ${esExito ? 'style="color: var(--c-brand); font-weight: 700;"' : ''}>${mensaje}</span>
            <div class="progress-track">
                <div class="progress-fill ${esExito ? 'reached' : ''}" style="width: ${porcentaje}%"></div>
            </div>
        </div>
    `;
};

/**
 * Genera el ítem de carrito según la vista (Mini o Full)
 */
const generarHTMLItem = (prod, esVistaMini = false) => {
    const path = obtenerPathBase();
    const [nombreLimpio, infoExtra = ''] = prod.nombre.split(/\s*-\s*/);

    if (esVistaMini) {
        return `
            <div class="cart-item" data-id="${prod.id}">
                <img src="${path}${prod.imagen}" alt="${nombreLimpio}">
                <div class="item-details">
                    <h5>${nombreLimpio}</h5>
                    ${infoExtra ? `<div class="text-muted small">${infoExtra}</div>` : ''}
                    <div class="item-controls-wrapper">
                        <div class="quantity-controls">
                            <button data-action="restar">−</button>
                            <span>${prod.cantidad}</span>
                            <button data-action="sumar">+</button>
                        </div>
                        <span class="item-price-unit">x ${formatearPrecio(prod.precio)}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button data-action="eliminar" class="delete-btn">&times;</button>
                    <div class="item-total">${formatearPrecio(prod.precio * prod.cantidad)}</div>
                </div>
            </div>
        `;
    }

    return `
        <article class="cart-page-item" data-id="${prod.id}">
            <img src="${path}${prod.imagen}" alt="${nombreLimpio}">
            <div class="cart-item-info">
                <h4>${nombreLimpio}</h4>
                ${infoExtra ? `<div class="text-muted small mb-1">${infoExtra}</div>` : ''}
                <div class="unit-price">Precio unitario: ${formatearPrecio(prod.precio)}</div>
            </div>
            <div class="cart-item-qty">
                <div class="quantity-controls">
                    <button data-action="restar">−</button>
                    <span>${prod.cantidad}</span>
                    <button data-action="sumar">+</button>
                </div>
            </div>
            <div class="cart-item-total-price">${formatearPrecio(prod.precio * prod.cantidad)}</div>
            <div class="cart-item-action">
                <button data-action="eliminar" class="delete-icon-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </div>
        </article>
    `;
};

// --- RENDERIZADORES ---

window.abrirModal = () => document.getElementById('cart-modal')?.classList.add('active');
window.cerrarModal = () => document.getElementById('cart-modal')?.classList.remove('active');

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

    carrito.forEach(p => contenedor.insertAdjacentHTML('beforeend', generarHTMLItem(p, true)));
    
    const total = window.calcularTotal();
    precioTotalEl.innerText = total.toLocaleString();

    if (minPurchaseArea) {
        if (total < MIN_COMPRA) {
            minPurchaseArea.innerHTML = generarHTMLBarraProgreso(total, MIN_COMPRA, `Te faltan ${formatearPrecio(MIN_COMPRA - total)} para el mínimo`);
            btnCheckout?.classList.add('btn-disabled');
        } else {
            minPurchaseArea.innerHTML = generarHTMLBarraProgreso(total, MIN_COMPRA, '¡Llegaste al mínimo de compra!', true);
            btnCheckout?.classList.remove('btn-disabled');
        }
    }
};

window.renderizarPaginaCarrito = () => {
    const contenedor = document.getElementById('full-cart-items');
    const subtotalEl = document.querySelector('.subtotal-val');
    const totalEl = document.querySelector('.total-val');
    const envioEl = document.querySelector('.envio-val');
    const promoArea = document.getElementById('shipping-promo-container-cart');
    const btnContinuar = document.querySelector('.btn-continuar-compra');

    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<div class="text-center p-5"><p>Tu carrito está vacío.</p><a href="./tienda.html" class="btn btn-verde">Ir a la tienda</a></div>';
        ['.subtotal-val', '.total-val'].forEach(cl => { const el = document.querySelector(cl); if (el) el.innerText = '$0'; });
        if (envioEl) envioEl.innerText = 'A calcular';
        if (promoArea) promoArea.innerHTML = '';
        btnContinuar?.classList.add('btn-disabled');
        
        // Reset de envío
        window.guardarCP('');
        localStorage.removeItem('shippingMethodPreference');
        return;
    }

    carrito.forEach(p => contenedor.insertAdjacentHTML('beforeend', generarHTMLItem(p, false)));

    const subtotal = window.calcularTotal();
    const savedCP = localStorage.getItem('userCP') || '';
    const costoEnvio = window.calcularCostoEnvio(savedCP);

    if (subtotalEl) subtotalEl.innerText = formatearPrecio(subtotal);

    // Envío y Total
    if (envioEl) {
        if (subtotal >= MIN_ENVIO_GRATIS) envioEl.innerHTML = '<span class="reached-text">¡Gratis!</span>';
        else if (costoEnvio !== null) envioEl.innerText = formatearPrecio(costoEnvio);
        else envioEl.innerText = 'A calcular';
    }
    if (totalEl) totalEl.innerText = formatearPrecio(subtotal + (costoEnvio || 0));

    // Promos y CP Calculator
    if (promoArea) {
        let html = '';
        if (subtotal < MIN_ENVIO_GRATIS) {
            html += generarHTMLBarraProgreso(subtotal, MIN_ENVIO_GRATIS, `Te faltan ${formatearPrecio(MIN_ENVIO_GRATIS - subtotal)} para el ENVÍO GRATIS`);
        } else {
            html += '<div class="reached-promo">🎉 ¡Tenés ENVÍO GRATIS!</div>';
        }

        html += `
            <div class="cp-calculator mt-4">
                <div class="cp-input-group">
                    <span class="small-label">Calcular costo de envío</span>
                    <div class="flex-row">
                        <input type="text" id="cart-cp-input" value="${savedCP}" placeholder="Cód. Postal" maxlength="4">
                        <button class="btn btn-outline btn-sm" onclick="manejarCalculoCP()">Calcular</button>
                    </div>
                </div>
            </div>
        `;

        if (subtotal < MIN_COMPRA) {
            html += `<div class="min-purchase-warning">⚠️ Te faltan ${formatearPrecio(MIN_COMPRA - subtotal)} para el mínimo de compra</div>`;
            btnContinuar?.classList.add('btn-disabled');
        } else {
            btnContinuar?.classList.remove('btn-disabled');
        }
        promoArea.innerHTML = html;
    }
};

// --- ENVÍO ---

window.calcularCostoEnvio = (cp) => {
    const total = window.calcularTotal();
    if (total >= MIN_ENVIO_GRATIS) return 0;
    if (!cp) return null;

    const nCP = parseInt(cp);
    if (isNaN(nCP)) return null;

    if (nCP >= 1000 && nCP <= 1499) return window.SHIPPING_CABA;
    if (nCP >= 1500 && nCP <= 1999) return window.SHIPPING_BSAS;
    return window.SHIPPING_RESTO;
};

window.guardarCP = (cp) => cp ? localStorage.setItem('userCP', cp) : localStorage.removeItem('userCP');

window.manejarCalculoCP = () => {
    const input = document.getElementById('cart-cp-input');
    if (!input) return;
    const cp = input.value.trim();
    if (cp.length < 4) return;
    window.guardarCP(cp);
    localStorage.setItem('shippingMethodPreference', 'shipping');
    window.renderizarPaginaCarrito();
};

// --- EVENTOS ---

document.addEventListener('click', (e) => {
    const btnAction = e.target.closest('button[data-action]');
    if (!btnAction) return;

    const action = btnAction.dataset.action;
    const itemId = btnAction.closest('[data-id]')?.dataset.id;

    if (itemId) {
        if (action === 'sumar') window.sumarEnCarrito(itemId);
        else if (action === 'restar') window.restarEnCarrito(itemId);
        else if (action === 'eliminar') window.eliminarDelCarrito(itemId);
    } else {
        if (action === 'checkout') window.validarYRedirigirCheckout();
        else if (action === 'view-cart') window.irAPaginaCarrito();
    }
});

window.sumarEnCarrito = (id) => { const item = carrito.find(p => p.id === id); if (item) { item.cantidad++; window.guardarCarrito(); } };
window.restarEnCarrito = (id) => { 
    const item = carrito.find(p => p.id === id); 
    if (item && item.cantidad > 1) { item.cantidad--; window.guardarCarrito(); } 
    else if (item) window.eliminarDelCarrito(id); 
};

window.validarYRedirigirCheckout = () => {
    if (carrito.length === 0 || window.calcularTotal() < MIN_COMPRA) return;
    const path = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    window.location.href = `${path}checkout.html`;
};

window.irAPaginaCarrito = () => {
    const path = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    window.location.href = `${path}carrito.html`;
};
