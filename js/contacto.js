/**
 * Lógica específica para la página de Contacto
 * Maneja el cambio de pestañas por URL y la validación de formularios.
 */
(() => {
    'use strict';

    /**
     * Sincroniza la pestaña activa con los parámetros de la URL
     * Permite que links externos abran directamente el formulario de cotización.
     */
    const sincronizarPestanasPorURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('form') === 'quote') {
            const quoteTabBtn = document.getElementById('quote-tab');
            const generalTabBtn = document.getElementById('general-tab');
            const quoteTabPane = document.getElementById('quote');
            const generalTabPane = document.getElementById('general');

            if (quoteTabBtn && quoteTabPane && generalTabBtn && generalTabPane) {
                // Desactivar General
                generalTabBtn.classList.remove('active');
                generalTabBtn.setAttribute('aria-selected', 'false');
                generalTabPane.classList.remove('show', 'active');

                // Activar Cotización
                quoteTabBtn.classList.add('active');
                quoteTabBtn.setAttribute('aria-selected', 'true');
                quoteTabPane.classList.add('show', 'active');
            }
        }
    };

    /**
     * Implementa la validación de estilos de Bootstrap para todos los formularios
     */
    const inicializarValidacionFormularios = () => {
        const forms = document.querySelectorAll('.needs-validation');
        
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // Foco al primer error para accesibilidad
                    const firstInvalid = form.querySelector(':invalid');
                    if (firstInvalid) firstInvalid.focus();
                } else {
                    // Redirección al mensaje exitoso tras breve delay con pantalla de carga
                    event.preventDefault();
                    
                    const overlay = document.getElementById('processing-overlay');
                    if (overlay) overlay.classList.add('active');
                    
                    setTimeout(() => {
                        window.location.href = 'mensaje-exitoso.html';
                    }, 1500);
                }
                form.classList.add('was-validated');
            }, false);
        });
    };

    // Inicializar al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        sincronizarPestanasPorURL();
        inicializarValidacionFormularios();
    });

})();
