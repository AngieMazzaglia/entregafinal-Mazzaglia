(() => {
    'use strict';

    const sincronizarPestanasPorURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('form') === 'quote') {
            const tabs = document.querySelectorAll('.nav-link');
            const targetPane = document.getElementById('quote');
            const tab = document.getElementById('quote-tab');

            if (targetPane) {
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active', 'show'));
                tabs.forEach(t => t.classList.remove('active'));

                targetPane.classList.add('active', 'show');
                tab.classList.add('active');
            }
        }
    };

    /*Implementa la validación de estilos de Bootstrap para todos los formularios*/
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
