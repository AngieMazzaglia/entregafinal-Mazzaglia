// Función para anunciar cambios a lectores de pantalla
const anunciarParaScreenReader = (mensaje) => {
    const statusRegion = document.getElementById('cart-status');
    if (statusRegion) {
        statusRegion.innerText = mensaje;
        // Limpiar después de unos segundos para que no se lea repetidamente si se navega
        setTimeout(() => {
            statusRegion.innerText = '';
        }, 3000);
    }
};
