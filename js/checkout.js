// Lógica del Checkout 3.0 (Versión Clean Code) 🛒✨

document.addEventListener('DOMContentLoaded', () => {
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
                
                // Si el mail es válido, sacamos el rojo.
                // Los campos de letras/números ahora se manejan en main.js para mostrar el aviso de "carácter no permitido"
                if (id === 'email' && verificarFormatoEmail(el.value)) {
                    el.classList.remove('is-invalid');
                }
            });

            // Validación al perder el foco para el mail
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

/**
 * Verifica si un array de IDs de inputs están todos completos y con formato válido
 */
const verificarInputsCompletos = (ids) => {
    return ids.every(id => {
        const input = document.getElementById(id);
        if (!input || input.value.trim() === '') return false;
        
        // Validaciones internas extra
        if (input.type === 'email') {
            return verificarFormatoEmail(input.value);
        }
        if (input.dataset.valid === 'numbers') {
            return /^[0-9\s+-]+$/.test(input.value);
        }
        if (input.dataset.valid === 'expiry') {
            return /^[0-9\/]+$/.test(input.value);
        }
        if (input.dataset.valid === 'letters') {
            return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
        }
        
        return true;
    });
};

/**
 * Helper para validar formato de email
 */
const verificarFormatoEmail = (valor) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
};

/**
 * Valida visualmente los campos obligatorios y sus formatos
 */
const validarCamposObligatorios = (ids) => {
    let todosValidos = true;
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        let esValido = input.value.trim() !== '';
        
        // Validar formato si tiene valor
        if (esValido) {
            if (input.type === 'email') {
                esValido = verificarFormatoEmail(input.value);
            } else if (input.dataset.valid === 'numbers') {
                esValido = /^[0-9\s+-]+$/.test(input.value);
            } else if (input.dataset.valid === 'expiry') {
                esValido = /^[0-9\/]+$/.test(input.value);
            } else if (input.dataset.valid === 'letters') {
                esValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value);
            }
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

/**
 * Navegación entre pasos con animación de éxito
 */
function irAlPaso(actual, siguiente) {
    const sectionActual = document.getElementById(`step-${actual}`);
    const sectionSiguiente = document.getElementById(`step-${siguiente}`);

    if (sectionActual && sectionSiguiente) {
        sectionActual.classList.remove('active');
        sectionActual.classList.add('completed');
        // Actualizar estados ARIA
        sectionActual.setAttribute('aria-expanded', 'false');
        sectionActual.setAttribute('aria-disabled', 'true');
        
        sectionSiguiente.classList.remove('disabled');
        sectionSiguiente.classList.add('active');
        sectionSiguiente.setAttribute('aria-expanded', 'true');
        sectionSiguiente.removeAttribute('aria-disabled');

        sectionSiguiente.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Anuncio para Screen Reader
        const titleNext = sectionSiguiente.querySelector('.step-header')?.innerText || `Paso ${siguiente}`;
        if (typeof anunciarParaScreenReader === 'function') {
            anunciarParaScreenReader(`Paso ${actual} completado. Ahora estás en el ${titleNext}`);
        }
    }
}

/**
 * Gran final del checkout con efecto glassmorphism
 */
function finalizarCompra() {
    const overlay = document.getElementById('processing-overlay');
    if (overlay) overlay.style.display = 'flex';

    setTimeout(() => {
        localStorage.removeItem('carrito');
        window.location.href = 'compra-exitosa.html';
    }, 2500);
}

/**
 * Renderiza el resumen lateral del pedido
 */
function renderizarResumenCheckout() {
    const contenedor = document.getElementById('checkout-summary-list');
    const totalEl = document.getElementById('checkout-total-val');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!contenedor || !totalEl) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
        totalEl.innerText = '$0';
        return;
    }

    let total = 0;
    contenedor.innerHTML = '';

    carrito.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'summary-item';
        div.innerHTML = `<span>${prod.cantidad}x ${prod.nombre}</span><span>$${subtotal.toLocaleString()}</span>`;
        contenedor.appendChild(div);
    });

    totalEl.innerText = `$${total.toLocaleString()}`;
}
