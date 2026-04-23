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
            const tabs = document.querySelectorAll('.nav-link');
            const targetPane = document.getElementById('quote');
            const tab = document.getElementById('quote-tab');

            if (targetPane) {
                // Ocultar todos los paneles quitando la clase active
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active', 'show'));
                // Quitar clase active de todos los botones
                tabs.forEach(t => t.classList.remove('active'));

                // Mostrar el elegido agregando la clase active
                targetPane.classList.add('active', 'show');
                tab.classList.add('active');
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
                        const path = window.obtenerPathBase();
                        window.location.href = `${path}pages/mensaje-exitoso.html`;
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
