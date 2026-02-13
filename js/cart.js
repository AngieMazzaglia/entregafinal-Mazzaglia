// Lógica del carrito de compras

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar en LocalStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
};

// Agregar producto al carrito
const agregarAlCarrito = (idProducto, cantidad = 1) => {
    const numsCantidad = parseInt(cantidad);
    const producto = productos.find(p => p.id === idProducto);
    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += numsCantidad;
    } else {
        carrito.push({ ...producto, cantidad: numsCantidad });
    }

    guardarCarrito();

    // Feedback: Abrir modal automáticamente
    renderizarCarritoEnModal();
    abrirModal();
    anunciarParaScreenReader(`Se agregó ${producto.nombre} al carrito`);
};

// Eliminar producto del carrito (restar cantidad o borrar todo)
const eliminarDelCarrito = (idProducto) => {
    const itemIndex = carrito.findIndex(p => p.id === idProducto);

    if (itemIndex !== -1) {
        carrito.splice(itemIndex, 1);
        guardarCarrito();
        // Re-renderizar si el modal está abierto para ver que se borró
        renderizarCarritoEnModal();
    }
};

// Calcular total
const calcularTotal = () => {
    return carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
};

// Actualizar contador del header (si existe)
const actualizarContadorCarrito = () => {
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        contador.innerText = totalItems;
        // Ocultar si es 0
        contador.style.display = totalItems > 0 ? 'inline-flex' : 'none';

        // Animación de pulso
        contador.parentElement.style.transform = "scale(1.2)";
        setTimeout(() => {
            contador.parentElement.style.transform = "scale(1)";
        }, 200);
    }
};

// Renderizar contenido del modal
const renderizarCarritoEnModal = () => {
    const contenedorItems = document.getElementById('cart-items');
    const precioTotal = document.getElementById('cart-total-price');

    // Limpiar previo
    contenedorItems.innerHTML = '';

    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p class="cart-empty-msg">Tu carrito está vacío</p>';
        precioTotal.innerText = '0';
        return;
    }

    // Listar productos
    carrito.forEach(prod => {
        const item = document.createElement('div');
        item.classList.add('cart-item');

        // Determinar path base para imágenes
        const basePath = window.location.pathname.includes('/pages/') ? '../' : './';

        item.innerHTML = `
            <img src="${basePath}${prod.imagen}" alt="${prod.nombre}">
            
            <div class="item-details">
                <h5>${prod.nombre}</h5>
                <div class="item-controls-wrapper">
                    <div class="quantity-controls">
                        <button onclick="restarEnCarrito('${prod.id}')" ${prod.cantidad === 1 ? 'disabled' : ''} aria-label="Disminuir cantidad de ${prod.nombre}">−</button>
                        <span aria-label="Cantidad actual: ${prod.cantidad}">${prod.cantidad}</span>
                        <button onclick="sumarEnCarrito('${prod.id}')" aria-label="Aumentar cantidad de ${prod.nombre}">+</button>
                    </div>
                    <span class="item-price-unit">x $${prod.precio.toLocaleString()}</span>
                </div>
            </div>

            <div class="item-actions">
                <button onclick="eliminarDelCarrito('${prod.id}')" class="delete-btn" aria-label="Eliminar ${prod.nombre} del carrito">&times;</button>
                <div class="item-total">$${(prod.precio * prod.cantidad).toLocaleString()}</div>
            </div>
        `;
        contenedorItems.appendChild(item);
    });

    // Actualizar total
    precioTotal.innerText = calcularTotal().toLocaleString();
};

// -- Helpers para modificar cantidad desde el Carrito --
const sumarEnCarrito = (id) => {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad++;
        guardarCarrito();
        renderizarCarritoEnModal();
    }
}

const restarEnCarrito = (id) => {
    const item = carrito.find(p => p.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad--;
        guardarCarrito();
        renderizarCarritoEnModal();
    }
}

// Variables para focus trap
let lastFocusedElement;

// Abrir modal
const abrirModal = () => {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        lastFocusedElement = document.activeElement; // Guardar elemento enfocado
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Mover foco al botón de cerrar o al primer elemento interactivo
        const closeBtn = document.getElementById('close-cart');
        if (closeBtn) {
            closeBtn.focus();
        }

        // Activar listener para atrapar el foco
        modal.addEventListener('keydown', trapFocus);
    }
};

// Cerrar modal
const cerrarModal = () => {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeEventListener('keydown', trapFocus);

        // Devolver foco
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }
};

// Función para atrapar el foco dentro del modal
const trapFocus = (e) => {
    const modal = document.getElementById('cart-modal');
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    if (e.key === 'Escape') {
        cerrarModal();
    }
};
