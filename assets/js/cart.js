// Lógica del carrito de compras

const cartKey = 'revida_cart';

// Obtener carrito del storage
function getCart() {
    const storedCart = localStorage.getItem(cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
}

// Guardar carrito en storage
function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartUI(); // Actualizar UI cada vez que cambia
}

// Agregar producto (ahora recibe variantId)
function addToCart(variantId) {
    const cart = getCart();

    // Buscar el producto/variante en la estructura de categorías
    let productFn = null;
    let categoryFn = null;

    for (const cat of products) {
        const found = cat.variants.find(v => v.id === variantId);
        if (found) {
            productFn = found;
            categoryFn = cat;
            break;
        }
    }

    if (!productFn) {
        console.error('Producto no encontrado');
        return;
    }

    const existingItem = cart.find(item => item.id === variantId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productFn.id,
            name: productFn.name,
            price: productFn.price,
            image: productFn.image, // Imagen de la variante
            quantity: 1,
            category: categoryFn.name
        });
    }

    saveCart(cart);
    // Alert simple
    alert(`¡${productFn.name} agregado al carrito!`);
}

// Eliminar producto
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

// Vaciar carrito
function clearCart() {
    localStorage.removeItem(cartKey);
    updateCartUI();
}

// Calcular total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Placeholder para actualizar UI (se implementará en Fase 3)
// Actualizar UI
function updateCartUI() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = getCartTotal();

    // Actualizar badges en toda la página (mobile y desktop si hubiera)
    const badges = document.querySelectorAll('#cart-count');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
        // Animación simple
        badge.classList.remove('pulse');
        void badge.offsetWidth; // trigger reflow
        badge.classList.add('pulse');
    });

    // Actualizar Modal si está abierto o al abrirse
    renderCartModal(cart, total);
}

function renderCartModal(cart, total) {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (!container || !totalEl) return;

    totalEl.textContent = `$${total.toLocaleString()}`;

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-muted py-4">Tu carrito está vacío 😔</p>';
        return;
    }

    container.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'd-flex align-items-center justify-content-between border-bottom pb-2';
        row.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">$${item.price} x ${item.quantity}</small>
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <span class="fw-bold">$${itemTotal.toLocaleString()}</span>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="removeFromCart(${item.id})" aria-label="Eliminar">🗑️</button>
            </div>
        `;
        container.appendChild(row);
    });
}

function goToCheckout() {
    // Redirigir o abrir modal de checkout
    // Por ahora, alert
    if (getCart().length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    // TODO: Implementar navegación a checkout
    alert("Yendo al checkout... (Próximamente)");
}

// Inicializar UI al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
