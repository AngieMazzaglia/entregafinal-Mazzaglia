const products = [
    {
        id: "personalizadas",
        name: "Bolsas personalizadas",
        image: "../assets/img/prod1.webp",
        description: "Bolsas personalizadas con el logo de tu marca. Hechas con materiales sustentables.",
        variants: [
            { id: 101, name: "20x30 cm", price: 45000, description: "100 unidades", image: "../assets/img/prod1.webp" },
            { id: 102, name: "30x40 cm", price: 55000, description: "100 unidades", image: "../assets/img/prod1.webp" },
            { id: 103, name: "40x50 cm", price: 65000, description: "100 unidades", image: "../assets/img/prod1.webp" }
        ]
    },
    {
        id: "disenos",
        name: "Bolsas con diseños",
        image: "../assets/img/prod2.webp",
        description: "Con estampas únicas y licencias exclusivas.",
        variants: [
            { id: 201, name: "Estampado Floral", price: 4500, description: "10 unidades", image: "../assets/img/prod2.webp" },
            { id: 202, name: "Estampado Geométrico", price: 4500, description: "10 unidades", image: "../assets/img/prod2.webp" },
            { id: 203, name: "Edición Especial", price: 5000, description: "10 unidades", image: "../assets/img/prod2.webp" }
        ]
    },
    {
        id: "composteras",
        name: "Composteras",
        image: "../assets/img/prod3.webp",
        description: "Prácticas, resistentes y fáciles de usar.",
        variants: [
            { id: 301, name: "Doméstica 20L", price: 15000, description: "1 unidad", image: "../assets/img/prod3.webp" },
            { id: 302, name: "Jardín 60L", price: 35000, description: "1 unidad", image: "../assets/img/prod3.webp" },
            { id: 303, name: "Kit Iniciación", price: 22000, description: "Compostera + Núcleo", image: "../assets/img/prod3.webp" }
        ]
    },
    {
        id: "ecologicas",
        name: "Bolsas ecológicas",
        image: "../assets/img/prod4.webp",
        description: "Reutilizables, lavables y durables.",
        variants: [
            { id: 401, name: "Bolsa Standard", price: 1200, description: "50 unidades", image: "../assets/img/prod4.webp" },
            { id: 402, name: "Bolsa Pocket", price: 1500, description: "50 unidades", image: "../assets/img/prod4.webp" },
            { id: 403, name: "Bolsa XXL", price: 2000, description: "50 unidades", image: "../assets/img/prod4.webp" }
        ]
    },
    {
        id: "papel",
        name: "Bolsas de papel",
        image: "../assets/img/prod5.webp",
        description: "Una alternativa sustentable y reciclable.",
        variants: [
            { id: 501, name: "Kraft #1", price: 20000, description: "100 unidades", image: "../assets/img/prod5.webp" },
            { id: 502, name: "Kraft #2", price: 25000, description: "100 unidades", image: "../assets/img/prod5.webp" },
            { id: 503, name: "Papel Blanco", price: 28000, description: "100 unidades", image: "../assets/img/prod5.webp" }
        ]
    },
    {
        id: "biodegradables",
        name: "Bolsas biodegradables",
        image: "../assets/img/prod6.webp",
        description: "Ideales para supermercados y locales de comida.",
        variants: [
            { id: 601, name: "Camiseta 40x50", price: 3000, description: "Rollo 1kg", image: "../assets/img/prod6.webp" },
            { id: 602, name: "Camiseta 50x60", price: 4200, description: "Rollo 1kg", image: "../assets/img/prod6.webp" },
            { id: 603, name: "Arranque", price: 2500, description: "Rollo 1kg", image: "../assets/img/prod6.webp" }
        ]
    }
];

// Lógica para mostrar detalle de categoría (Section Swap)
function showCategoryDetail(categoryId) {
    const category = products.find(c => c.id === categoryId);
    if (!category) return;

    // Ocultar lista categorías, mostrar detalle
    document.getElementById('categories-view').style.display = 'none';
    const detailView = document.getElementById('category-detail-view');
    detailView.style.display = 'block';

    // Actualizar Breadcrumb
    const breadcrumb = document.getElementById('detail-breadcrumb');
    breadcrumb.innerHTML = `<a href="#" onclick="showCategoriesList(); return false;">Nuestros productos</a> > <strong>${category.name}</strong>`;

    // Renderizar variantes
    const container = document.getElementById('detail-variants-grid');
    container.innerHTML = '';

    category.variants.forEach(variant => {
        const col = document.createElement('div');
        // col.className = 'col-md-6 col-lg-3'; // Removed: using CSS grid-4 on parent instead

        col.innerHTML = `
            <div class="card h-100 border-1 shadow-sm" style="border-radius: 8px;">
                <div style="padding: 16px;">
                    <img src="${variant.image}" class="img-fluid" alt="${variant.name}" style="border-radius: 4px; object-fit: contain; width: 100%; height: auto;">
                </div>
                <div class="card-body p-3 d-flex flex-column">
                    <h5 class="card-title fw-bold mb-1" style="font-size: 0.95rem;">${variant.name}</h5>
                    <p class="mb-2 fw-bold" style="font-size: 1.1rem;">$${variant.price}</p>
                    <p class="text-muted small mb-3">${variant.description || ''}</p>
                    
                    <button class="btn btn-verde w-100 mt-auto fw-bold" style="border-radius: 4px;" onclick="addToCart(${variant.id})">
                        Comprar
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function showCategoriesList() {
    document.getElementById('category-detail-view').style.display = 'none';
    document.getElementById('categories-view').style.display = 'block';
}
