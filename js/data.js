const productos = [


    // --- BOLSAS PERSONALIZADAS (Placeholders) ---
    {
        id: "bols-pers-01",
        nombre: "Bolsa ecológica personalizada",
        precio: "Pedir cotización",
        imagen: "assets/img/prod1.webp",
        categoria: "personalizadas",
        descripcion: "Bolsas personalizables con tu logo."
    },

    // --- BOLSAS ECOLOGICAS (Placeholders) ---
    {
        id: "bols-eco-02",
        nombre: "Bolsa de tela roja - 50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa1.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica roja, ligera y resistente."
    },
    {
        id: "bols-eco-03",
        nombre: "Bolsa de tela amarilla - 50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa2.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica amarilla, ligera y resistente."
    },
    {
        id: "bols-eco-04",
        nombre: "Bolsa de tela verde - 50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa3.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica verde, ligera y resistente."
    },
    {
        id: "bols-eco-05",
        nombre: "Bolsa de tela azul - 50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa4.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica azul, ligera y resistente."
    },
    {
        id: "bols-eco-01",
        nombre: "Bolsas de tela - Mix de colores - 50 unid.",
        precio: 10000,
        imagen: "assets/img/prod4.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica. Surtido de colores."
    },
    // --- BOLSAS CON DISEÑOS ---
    {
        id: "bols-dis-00",
        nombre: "Bolsa primavera - 50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio1.webp",
        categoria: "diseños",
        descripcion: "Diseño exclusivo."
    },
    {
        id: "bols-dis-01",
        nombre: "Bolsa sierras - 50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio2.webp",
        categoria: "diseños",
        descripcion: "Diseño exclusivo."
    },
    {
        id: "bols-dis-03",
        nombre: "Bolsa unión - 50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio3.webp",
        categoria: "diseños",
        descripcion: "Diseño exclusivo."
    },
    {
        id: "bols-dis-04",
        nombre: "Bolsa jardín - 50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio4.webp",
        categoria: "diseños",
        descripcion: "Diseño exclusivo."
    },
    // --- BOLSAS DE PAPEL ---
    {
        id: "bols-pap-00",
        nombre: "Bolsa con manija retorcida - 50 unidades",
        precio: 10000,
        imagen: "assets/img/prod5.webp",
        categoria: "papel",
        descripcion: "Clásica y resistente"
    },
    {
        id: "bols-pap-01",
        nombre: "Bolsa con manija troquelada - 50 unid.",
        precio: 10000,
        imagen: "assets/img/papel2.webp",
        categoria: "papel",
        descripcion: "Práctica y resistente."
    },
    {
        id: "bols-pap-02",
        nombre: "Bolsa con manija plana - 50 unidades",
        precio: 10000,
        imagen: "assets/img/papel3.webp",
        categoria: "papel",
        descripcion: "Resistente y versátil."
    },
    {
        id: "bols-pap-03",
        nombre: "Bolsa de papel tipo sobre - 50 unidades",
        precio: 10000,
        imagen: "assets/img/papel4.webp",
        categoria: "papel",
        descripcion: "Ideal para delivery y take away."
    },
    // --- BOLSAS BIODEGRADABLES ---
    {
        id: "bols-bio-00",
        nombre: "Bolsa tipo camiseta - 50 unidades",
        precio: 10000,
        imagen: "assets/img/prod6.webp",
        categoria: "biodegradables",
        descripcion: "Fabricada con materiales compostables."
    },
    {
        id: "bols-bio-01",
        nombre: "Bolsa con manija troquelada - 50 unid.",
        precio: 10000,
        imagen: "assets/img/biod2.webp",
        categoria: "biodegradables",
        descripcion: "Resistente y amigable con el ambiente."
    },
    {
        id: "bols-bio-02",
        nombre: "Bolsa tipo sobre - 50 unidades",
        precio: 10000,
        imagen: "assets/img/biod3.webp",
        categoria: "biodegradables",
        descripcion: "Práctica para productos livianos y empaque."
    },

    // --- COMPOSTERAS ---
    {
        id: "comp-02",
        nombre: "Compostera giratoria simple 60lt",
        precio: 200000,
        imagen: "assets/img/compost1.webp",
        categoria: "composteras",
        descripcion: "Ideal para hogares pequeños."
    },
    {
        id: "comp-01",
        nombre: "Compostera giratoria doble 120lt",
        precio: 300000,
        imagen: "assets/img/compost2.webp",
        categoria: "composteras",
        descripcion: "Doble compartimento con mayor capacidad."
    },
    {
        id: "comp-04",
        nombre: "Compostera 60lt + Kit de herramientas",
        precio: 220000,
        imagen: "assets/img/compost3.webp",
        categoria: "composteras",
        descripcion: "Para hogares pequeños, con heramientas."
    },
    {
        id: "comp-03",
        nombre: "Compostera 120lt + Kit de herramientas",
        precio: 320000,
        imagen: "assets/img/compost4.webp",
        categoria: "composteras",
        descripcion: "Doble compartimento, con herramientas."
    },
    {
        id: "comp-05",
        nombre: "Kit de herramientas",
        precio: 40000,
        imagen: "assets/img/compost5.webp",
        categoria: "composteras",
        descripcion: "Herramientas básicas para compostar."
    }
];

// Función helper para filtrar por categoría
const obtenerProductosPorCategoria = (categoria) => {
    if (!categoria) return productos; // Devuelve todo si no hay categoría
    return productos.filter(p => p.categoria === categoria);
};

// Función helper para buscar por texto
const obtenerProductosPorBusqueda = (termino) => {
    if (!termino) return [];
    const lowerTerm = termino.toLowerCase();
    return productos.filter(p =>
        p.nombre.toLowerCase().includes(lowerTerm) ||
        p.descripcion.toLowerCase().includes(lowerTerm)
    );
};
