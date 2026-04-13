// Lógica del Checkout 3.0 (Versión Clean Code) 🛒✨

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar vista
    renderizarResumenCheckout();
    
    // Selectores Principales
    const btnStep1 = document.getElementById('btn-step-1');
    const btnStep2 = document.getElementById('btn-step-2');
    const btnStep3 = document.getElementById('btn-step-3');

    // --- PASO 1: DATOS PERSONALES ---
    if (btnStep1) {
        const inputsPaso1 = ['fname', 'lname', 'email', 'phone'];
        btnStep1.disabled = true;

        inputsPaso1.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            el.addEventListener('input', () => {
                const esValido = verificarInputsCompletos(inputsPaso1);
                btnStep1.disabled = !esValido;
                
                if (id === 'email' && verificarFormatoEmail(el.value)) {
                    el.classList.remove('is-invalid');
                }
            });

            if (id === 'email') {
                el.addEventListener('blur', () => {
                    if (el.value.trim() !== '') {
                        validarCamposObligatorios([id]);
                    }
                });
            }
        });

        btnStep1.addEventListener('click', () => {
            if (validarCamposObligatorios(inputsPaso1)) irAlPaso(1, 2);
        });
    }

    // --- PASO 2: DATOS DE ENVÍO ---
    if (btnStep2) {
        const radiosEnvio = document.querySelectorAll('input[name="deliveryMethod"]');
        const shippingForm = document.getElementById('shipping-address-form');
        const shippingInputs = ['address', 'num', 'zip', 'prov', 'city'];

        radiosEnvio.forEach(radio => {
            radio.addEventListener('change', () => {
                const esEnvio = radio.value === 'shipping';
                shippingForm.style.display = esEnvio ? 'block' : 'none';
                
                if (esEnvio) {
                    btnStep2.disabled = !verificarInputsCompletos(shippingInputs);
                } else {
                    btnStep2.disabled = false;
                }
            });
        });

        shippingInputs.forEach(id => {
            const el = document.getElementById(id);
            el?.addEventListener('input', () => {
                btnStep2.disabled = !verificarInputsCompletos(shippingInputs);
                if (validarCamposObligatorios([id])) {
                    el.classList.remove('is-invalid');
                }
            });
        });

        btnStep2.addEventListener('click', () => {
            irAlPaso(2, 3);
        });
    }

    // --- PASO 3: MEDIO DE PAGO ---
    if (btnStep3) {
        const radiosPago = document.querySelectorAll('input[name="paymentMethod"]');
        const cardFields = document.getElementById('card-fields');
        const cardInputs = ['cardNumber', 'cardName', 'expiry', 'cvv'];

        btnStep3.disabled = true;

        radiosPago.forEach(radio => {
            radio.addEventListener('change', () => {
                const esTarjeta = radio.value === 'card';
                cardFields.style.display = esTarjeta ? 'block' : 'none';
                
                if (esTarjeta) {
                    btnStep3.disabled = !verificarInputsCompletos(cardInputs);
                } else {
                    btnStep3.disabled = false;
                }
            });
        });

        cardInputs.forEach(id => {
            const el = document.getElementById(id);
            el?.addEventListener('input', () => {
                btnStep3.disabled = !verificarInputsCompletos(cardInputs);
                if (validarCamposObligatorios([id])) {
                    el.classList.remove('is-invalid');
                }
            });
        });

        btnStep3.addEventListener('click', () => finalizarCompra());
    }
});

// --- FUNCIONES CORE ---

const verificarInputsCompletos = (ids) => {
    return ids.every(id => {
        const input = document.getElementById(id);
        if (!input || input.value.trim() === '') return false;
        
        if (input.type === 'email') return verificarFormatoEmail(input.value);
        if (input.dataset.valid === 'numbers') return /^[0-9\s+-]+$/.test(input.value);
        if (input.dataset.valid === 'expiry') return /^[0-9\/]+$/.test(input.value);
        if (input.dataset.valid === 'letters') return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
        
        return true;
    });
};

const verificarFormatoEmail = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

const validarCamposObligatorios = (ids) => {
    let todosValidos = true;
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        let esValido = input.value.trim() !== '';
        
        if (esValido) {
            if (input.type === 'email') esValido = verificarFormatoEmail(input.value);
            else if (input.dataset.valid === 'numbers') esValido = /^[0-9\s+-]+$/.test(input.value);
            else if (input.dataset.valid === 'expiry') esValido = /^[0-9\/]+$/.test(input.value);
            else if (input.dataset.valid === 'letters') esValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
        }

        if (!esValido) {
            input.classList.add('is-invalid');
            input.setAttribute('aria-invalid', 'true');
            todosValidos = false;
        } else {
            input.classList.remove('is-invalid');
            input.removeAttribute('aria-invalid');
        }
    });
    return todosValidos;
};

function irAlPaso(actual, siguiente) {
    const sectionActual = document.getElementById(`step-${actual}`);
    const sectionSiguiente = document.getElementById(`step-${siguiente}`);

    if (sectionActual && sectionSiguiente) {
        sectionActual.classList.remove('active');
        sectionActual.classList.add('completed');
        sectionActual.setAttribute('aria-expanded', 'false');
        sectionActual.setAttribute('aria-disabled', 'true');
        
        sectionSiguiente.classList.remove('disabled');
        sectionSiguiente.classList.add('active');
        sectionSiguiente.setAttribute('aria-expanded', 'true');
        sectionSiguiente.removeAttribute('aria-disabled');

        sectionSiguiente.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (typeof window.anunciarParaScreenReader === 'function') {
            const titleNext = sectionSiguiente.querySelector('.step-header')?.innerText || `Paso ${siguiente}`;
            window.anunciarParaScreenReader(`Paso ${actual} completado. Ahora estás en el ${titleNext}`);
        }
    }
}

function finalizarCompra() {
    const overlay = document.getElementById('processing-overlay');
    if (overlay) overlay.style.display = 'flex';

    setTimeout(() => {
        localStorage.removeItem('carrito');
        window.location.href = 'compra-exitosa.html';
    }, 2500);
}

function renderizarResumenCheckout() {
    const contenedor = document.getElementById('checkout-summary-list');
    const totalEl = document.getElementById('checkout-total-val');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Acceso robusto a utilidades globales
    const formatear = (val) => (typeof window.formatearPrecio === 'function') ? window.formatearPrecio(val) : `$${val}`;

    if (!contenedor || !totalEl) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
        totalEl.innerText = '$0';
        return;
    }

    const total = (typeof window.calcularTotal === 'function') ? window.calcularTotal() : 0;
    contenedor.innerHTML = '';

    carrito.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'summary-item';
        // Protección extra si el precio no es numérico (ej. "Pedir cotización")
        const subtotalItem = (typeof prod.precio === 'number') ? prod.precio * prod.cantidad : 0;
        const subtotalTexto = (typeof prod.precio === 'number') ? formatear(subtotalItem) : prod.precio;
        
        div.innerHTML = `<span>${prod.cantidad}x ${prod.nombre}</span><span>${subtotalTexto}</span>`;
        contenedor.appendChild(div);
    });

    totalEl.innerText = formatear(total);
}
