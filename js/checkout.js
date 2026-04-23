// Lógica del Checkout 3.0 (Versión Clean Code) 🛒✨

/**
 * CONFIGURACIÓN Y VALIDACIONES
 * Centralizamos las reglas para facilitar el mantenimiento.
 */
const REGLAS_VALIDACION = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    numbers: /^[0-9\s+-]+$/,
    expiry: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
    letters: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    cardNumber: /^[0-9]{16}$/   // se valida contra dígitos sin espacios
};

/**
 * Crea (o recupera si ya existe) el elemento de hint de error
 * para un campo determinado, siguiendo el patrón del validador global.
 * @param {HTMLElement|null} input - El input de referencia
 * @param {string} texto - Mensaje a mostrar al usuario
 * @returns {HTMLElement|null}
 */
function crearHintInput(input, texto) {
    const parent = input?.closest('.form-group');
    if (!parent) return null;
    let hint = parent.querySelector('.input-error-hint');
    if (!hint) {
        hint = document.createElement('span');
        hint.className = 'input-error-hint';
        hint.innerText = texto;
        parent.appendChild(hint);
    }
    return hint;
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar vista
    renderizarResumenCheckout();
    
    // Configurar cada sección del checkout
    setupPaso1();
    setupPaso2();
    setupPaso3();
    setupNavegacionPasos();
    setupSummaryToggleMovil();
});

/**
 * Lógica para el acordeón del resumen en dispositivos móviles
 */
function setupSummaryToggleMovil() {
    const toggle = document.getElementById('summary-toggle');
    const summarySide = document.querySelector('.checkout-summary-side');
    
    if (toggle && summarySide) {
        toggle.addEventListener('click', () => {
            const isExpanded = summarySide.classList.toggle('is-expanded');
            toggle.classList.toggle('is-active');
            
            // Cambiar texto de ayuda según estado
            const textEl = toggle.querySelector('.toggle-text');
            if (textEl) {
                const chevron = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                const iconCart = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-cart-toggle"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';
                
                textEl.innerHTML = isExpanded 
                    ? `${iconCart} Ocultar detalle de pedido ${chevron}` 
                    : `${iconCart} Ver detalle de pedido ${chevron}`;
            }
        });
    }
}

// --- CONFIGURACIÓN DE PASOS ---

/**
 * Paso 1: Datos Personales
 */
function setupPaso1() {
    const btnNext = document.getElementById('btn-step-1');
    if (!btnNext) return;

    const inputs = ['fname', 'lname', 'email', 'phone'];
    btnNext.disabled = true;

    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('input', () => {
            btnNext.disabled = !verificarInputsCompletos(inputs);
            if (id === 'email' && validarFormato(el.value, 'email')) {
                el.classList.remove('is-invalid');
            }
        });

        if (id === 'email') {
            el.addEventListener('blur', () => {
                if (el.value.trim() !== '') validarInputs([id]);
            });
        }
    });

    btnNext.addEventListener('click', () => {
        if (validarInputs(inputs)) irAlPaso(1, 2);
    });
}

/**
 * Paso 2: Datos de Envío
 */
function setupPaso2() {
    const btnNext = document.getElementById('btn-step-2');
    if (!btnNext) return;

    const radiosEnvio = document.querySelectorAll('input[name="deliveryMethod"]');
    const shippingForm = document.getElementById('shipping-address-form');
    const shippingInputs = ['address', 'num', 'zip', 'prov', 'city'];
    const zipInput = document.getElementById('zip');
    
    // Recuperar estado previo
    const savedCP = localStorage.getItem('userCP');
    const shippingPreference = localStorage.getItem('shippingMethodPreference');

    if (savedCP && zipInput) zipInput.value = savedCP;

    // Aplicar preferencia de envío si existe
    if (shippingPreference === 'shipping') {
        const shippingRadio = document.querySelector('input[name="deliveryMethod"][value="shipping"]');
        if (shippingRadio) {
            shippingRadio.checked = true;
            shippingForm.classList.remove('d-none');
            btnNext.disabled = !verificarInputsCompletos(shippingInputs);
        }
    }

    // Asegurar resumen inicializado tras auto-selección
    renderizarResumenCheckout();

    // Eventos de Radios
    radiosEnvio.forEach(radio => {
        radio.addEventListener('change', () => {
            const esEnvio = radio.value === 'shipping';
            if (esEnvio) shippingForm.classList.remove('d-none');
            else shippingForm.classList.add('d-none');
            
            localStorage.setItem('shippingMethodPreference', radio.value);
            renderizarResumenCheckout();
            btnNext.disabled = esEnvio ? !verificarInputsCompletos(shippingInputs) : false;
        });
    });

    // Eventos de Inputs de Dirección
    shippingInputs.forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener('input', () => {
            if (id === 'zip' && el.value.trim().length === 4) {
                localStorage.setItem('userCP', el.value.trim());
                renderizarResumenCheckout();
            }
            btnNext.disabled = !verificarInputsCompletos(shippingInputs);
            if (validarInputs([id])) el.classList.remove('is-invalid');
        });
    });

    btnNext.addEventListener('click', () => irAlPaso(2, 3));
}

/**
 * Paso 3: Medio de Pago
 */
function setupPaso3() {
    const btnFinalizar = document.getElementById('btn-step-3');
    if (!btnFinalizar) return;

    const radiosPago = document.querySelectorAll('input[name="paymentMethod"]');
    const cardFields = document.getElementById('card-fields');
    const cardInputs = ['cardNumber', 'cardName', 'expiry', 'cvv'];

    btnFinalizar.disabled = true;

    radiosPago.forEach(radio => {
        radio.addEventListener('change', () => {
            const esTarjeta = radio.value === 'card';
            if (esTarjeta) cardFields.classList.remove('d-none');
            else cardFields.classList.add('d-none');
            
            btnFinalizar.disabled = esTarjeta ? !verificarInputsCompletos(cardInputs) : false;
        });
    });

    // Formateadores automáticos
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiry');

    // Crear hints para campos con formateadores propios (excluidos del validador global)
    const cardNumberHint = crearHintInput(cardNumberInput, 'Solo se permiten números');
    const expiryHint     = crearHintInput(expiryInput,     'Solo se permiten números');

    cardNumberInput?.addEventListener('input', () => {
        // Detectar caracteres inválidos ANTES de que el formateador los elimine
        const hadInvalidChars = /[^\d\s]/.test(cardNumberInput.value);
        formatearNumeroTarjeta(cardNumberInput);
        btnFinalizar.disabled = !verificarInputsCompletos(cardInputs);
        if (cardNumberHint) {
            hadInvalidChars ? cardNumberHint.classList.add('visible') : cardNumberHint.classList.remove('visible');
        }
        
        // Solo quitar el rojo si el numero llega a ser válido (16 dígitos sin espacios)
        const pureDigits = cardNumberInput.value.replace(/\s/g, '');
        if (pureDigits.length === 16) {
            validarInputs(['cardNumber']);
        } else {
            // No agregamos is-invalid mientras escribe, pero si ya estaba, lo dejamos hasta que sea válido
        }
    });

    cardNumberInput?.addEventListener('blur', () => {
        if (cardNumberInput.value.trim() !== '') {
            validarInputs(['cardNumber']);
        }
    });

    expiryInput?.addEventListener('input', (e) => {
        // Detectar letras ANTES de que el formateador las elimine
        const hadLetters = /[a-zA-Z]/.test(expiryInput.value);
        formatearVencimiento(expiryInput, e);
        btnFinalizar.disabled = !verificarInputsCompletos(cardInputs);
        if (expiryHint) {
            hadLetters ? expiryHint.classList.add('visible') : expiryHint.classList.remove('visible');
        }
        // Solo marcar rojo cuando el campo está completo (MM/AA = 5 chars)
        if (expiryInput.value.length === 5) {
            validarInputs(['expiry']);
        } else {
            expiryInput.classList.remove('is-invalid');
        }
    });

    expiryInput?.addEventListener('blur', () => {
        if (expiryInput.value.trim() !== '') validarInputs(['expiry']);
    });

    // Resto de campos de tarjeta (sin formateadores especiales)
    ['cardName', 'cvv'].forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener('input', () => {
            btnFinalizar.disabled = !verificarInputsCompletos(cardInputs);
            if (validarInputs([id])) el.classList.remove('is-invalid');
        });
    });

    btnFinalizar.addEventListener('click', () => finalizarCompra());
}

// --- UTILIDADES CORE ---

/**
 * Verifica si una lista de inputs tiene valores válidos
 */
function verificarInputsCompletos(ids) {
    return ids.every(id => {
        const input = document.getElementById(id);
        if (!input || input.value.trim() === '') return false;
        
        const tipoValidacion = input.type === 'email' ? 'email' : input.dataset.valid;
        return tipoValidacion ? validarFormato(input.value, tipoValidacion) : true;
    });
}

/**
 * Valida un valor contra una regla específica.
 * Para cardNumber, se eliminan los espacios antes de validar.
 */
function validarFormato(valor, tipo) {
    const regex = REGLAS_VALIDACION[tipo];
    if (!regex) return true;
    const valorAValidar = tipo === 'cardNumber' ? valor.replace(/\s/g, '') : valor;
    
    const esFormatoValido = regex.test(valorAValidar);
    if (!esFormatoValido) return false;

    // Validación extra para fecha de vencimiento (no estar en el pasado)
    if (tipo === 'expiry') {
        const [mStr, yStr] = valorAValidar.split('/');
        const mes = parseInt(mStr, 10);
        const anio = parseInt('20' + yStr, 10); // Asumimos siglo 21
        
        const hoy = new Date();
        const anioActual = hoy.getFullYear();
        const mesActual = hoy.getMonth() + 1; // 1-12

        if (anio < anioActual) return false;
        if (anio === anioActual && mes < mesActual) return false;
    }

    return true;
}

// --- FORMATEADORES DE TARJETA ---

/**
 * Formatea el número de tarjeta con un espacio cada 4 dígitos.
 * Permite solo dígitos, máximo 16.
 */
function formatearNumeroTarjeta(input) {
    const soloDigitos = input.value.replace(/\D/g, '').slice(0, 16);
    input.value = soloDigitos.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/**
 * Inserta automáticamente el '/' tras los primeros 2 dígitos del vencimiento.
 * Es inteligente: agrega la barra al escribir, pero permite borrarla.
 */
function formatearVencimiento(input, event) {
    let val = input.value.replace(/\D/g, '');
    
    // Si el usuario está borrando y termina en 2 dígitos, no forzamos la barra
    if (event && event.inputType === 'deleteContentBackward') {
        if (val.length === 2 && input.value.length === 2) return;
    }

    if (val.length >= 2) {
        input.value = val.slice(0, 2) + '/' + val.slice(2, 4);
    } else {
        input.value = val;
    }
}

/**
 * Valida visualmente los campos (marcando errores con CSS)
 */
function validarInputs(ids) {
    let todosValidos = true;
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        const vacio = input.value.trim() === '';
        const tipo = input.type === 'email' ? 'email' : input.dataset.valid;
        const formatoValido = tipo ? validarFormato(input.value, tipo) : true;

        if (vacio || !formatoValido) {
            input.classList.add('is-invalid');
            todosValidos = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    return todosValidos;
}

/**
 * Permite que los encabezados de pasos completados sean clickeables
 * para que el usuario pueda volver atrás y editar.
 */
function setupNavegacionPasos() {
    const headers = document.querySelectorAll('.step-header');
    headers.forEach(header => {
        const stepSection = header.parentElement;
        header.addEventListener('click', () => {
            // Solo dejamos volver si el paso fue completado o es el siguiente inmediato
            if (stepSection.classList.contains('completed')) {
                const stepId = parseInt(stepSection.id.replace('step-', ''));
                const activeSection = document.querySelector('.checkout-step.active');
                if (activeSection) {
                    const activeId = parseInt(activeSection.id.replace('step-', ''));
                    if (stepId < activeId) {
                        volverAlPaso(activeId, stepId);
                    }
                }
            }
        });
    });
}

/**
 * Lógica para retroceder a un paso anterior
 */
function volverAlPaso(actual, anterior) {
    const sectionActual = document.getElementById(`step-${actual}`);
    const sectionAnterior = document.getElementById(`step-${anterior}`);

    if (sectionActual && sectionAnterior) {
        sectionActual.classList.remove('active');
        // No removemos 'completed' si el usuario solo vuelve a mirar, 
        // se removerá si realmente cambia algo o lo volvemos activo
        
        sectionAnterior.classList.remove('completed', 'disabled');
        sectionAnterior.classList.add('active');
        sectionAnterior.setAttribute('aria-expanded', 'true');
        
        sectionAnterior.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function irAlPaso(actual, siguiente) {
    const sectionActual = document.getElementById(`step-${actual}`);
    const sectionSiguiente = document.getElementById(`step-${siguiente}`);

    if (sectionActual && sectionSiguiente) {
        sectionActual.classList.remove('active');
        sectionActual.classList.add('completed');
        sectionActual.setAttribute('aria-expanded', 'false');
        
        sectionSiguiente.classList.remove('disabled');
        sectionSiguiente.classList.add('active');
        sectionSiguiente.setAttribute('aria-expanded', 'true');
        sectionSiguiente.removeAttribute('aria-disabled');

        sectionSiguiente.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function finalizarCompra() {
    const overlay = document.getElementById('processing-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(() => {
        localStorage.removeItem('carrito');
        localStorage.removeItem('userCP');
        localStorage.removeItem('shippingMethodPreference');
        window.location.href = 'compra-exitosa.html';
    }, 2500);
}

// --- RENDERIZADO DEL RESUMEN ---

function renderizarResumenCheckout() {
    const contenedor = document.getElementById('checkout-summary-list');
    const totalEl = document.getElementById('checkout-total-val');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const formatear = (val) => (typeof window.formatearPrecio === 'function') ? window.formatearPrecio(val) : `$${val}`;

    if (!contenedor || !totalEl) return;
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
        totalEl.innerText = '$0';
        return;
    }

    const subtotal = (typeof window.calcularTotal === 'function') ? window.calcularTotal() : 0;
    contenedor.innerHTML = '';

    // 1. Productos
    carrito.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'summary-item';
        const itemSubtotal = (typeof prod.precio === 'number') ? prod.precio * prod.cantidad : 0;
        div.innerHTML = `<span>${prod.cantidad}x ${prod.nombre}</span><span>${formatear(itemSubtotal)}</span>`;
        contenedor.appendChild(div);
    });

    // 2. Envío
    const radioEnvio = document.querySelector('input[name="deliveryMethod"]:checked');
    const metodo = radioEnvio ? radioEnvio.value : null; // null = sin selección aún
    
    // Prioridad: Input > Local Storage
    const zipInput = document.getElementById('zip');
    const cp = zipInput ? zipInput.value.trim() : (localStorage.getItem('userCP') || '');
    
    let costoEnvio = 0;
    let textoEnvio = 'A calcular';

    if (metodo === 'pickup') {
        textoEnvio = 'Gratis';
    } else if (metodo === null) {
        // Sin método seleccionado: mostrar "Gratis" si ya aplica por monto total
        if (subtotal >= window.MIN_ENVIO_GRATIS) {
            textoEnvio = 'Gratis';
        } else {
            textoEnvio = 'A calcular';
        }
    } else {
        costoEnvio = (typeof window.calcularCostoEnvio === 'function') ? window.calcularCostoEnvio(cp) : 0;
        if (costoEnvio === 0 && (cp !== '' || subtotal >= window.MIN_ENVIO_GRATIS)) {
            textoEnvio = 'Gratis';
        } else if (costoEnvio === null || (cp === '' && subtotal < window.MIN_ENVIO_GRATIS)) {
            textoEnvio = 'A calcular';
            costoEnvio = 0;
        } else {
            textoEnvio = formatear(costoEnvio);
        }
    }

    // 3. Inyectar línea de envío
    const envioDiv = document.createElement('div');
    envioDiv.className = 'summary-item shipping-line';
    envioDiv.innerHTML = `<span>Envío</span><span class="${textoEnvio === 'Gratis' ? 'reached-text' : ''}">${textoEnvio}</span>`;
    contenedor.appendChild(envioDiv);

    // 4. Total Final
    const totalFormateado = formatear(subtotal + costoEnvio);
    totalEl.innerText = totalFormateado;

    // Sincronizar con el total del toggle móvil si existe
    const mobileTotalEl = document.getElementById('mobile-summary-total-val');
    if (mobileTotalEl) {
        mobileTotalEl.innerText = totalFormateado;
    }
    
    const toggle = document.getElementById('mobile-summary-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.getElementById('checkout-summary-list').classList.toggle('show');
        });
    }
}
