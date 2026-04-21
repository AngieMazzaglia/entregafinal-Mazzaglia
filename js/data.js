const productos = [


    // --- BOLSAS PERSONALIZADAS ---
    {
        id: "bols-pers-01",
        nombre: "Bolsas personalizadas",
        subtitulo: "A medida según tu marca",
        precio: "Pedir cotización",
        imagen: "assets/img/prod1.webp",
        categoria: "personalizadas",
        descripcion: "Personalizá tus bolsas con el diseño o logo de tu marca.",
        caracteristicas: [
            "Diferentes tamaños y materiales disponibles",
            "Impresión con logo o diseño personalizado",
            "Producción a pedido (mínimo 50 unidades)",
            "Asesoramiento en diseño y formato",
            "Opciones para bolsas de tela, papel o biodegradables",
            "Ideal para marcas, eventos y packaging"
        ]
    },

    // --- BOLSAS ECOLOGICAS ---
    {
        id: "bols-eco-02",
        nombre: "Bolsa de tela roja",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa1.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica roja, ligera y resistente.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica de 80 g",
            "Manijas reforzadas",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-eco-03",
        nombre: "Bolsa de tela amarilla",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa2.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica amarilla, ligera y resistente.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica de 80 g",
            "Manijas reforzadas",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-eco-04",
        nombre: "Bolsa de tela verde",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa3.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica verde, ligera y resistente.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica de 80 g",
            "Manijas reforzadas",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-eco-05",
        nombre: "Bolsa de tela azul",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/bolsa4.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica azul, ligera y resistente.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica de 80 g",
            "Manijas reforzadas",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-eco-01",
        nombre: "Bolsas de tela Mix colores",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/prod4.webp",
        categoria: "ecologicas",
        descripcion: "Tela ecológica. Surtido de colores.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica de 80 g",
            "Manijas reforzadas",
            "Reutilizable y fácil de limpiar"
        ]
    },

    // --- BOLSAS CON DISEÑOS ---
    {
        id: "bols-dis-00",
        nombre: "Bolsa Primavera",
        subtitulo: "Pack x50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio1.webp",
        categoria: "disenos",
        descripcion: "Diseño floral exclusivo sobre tela ecológica.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica liviana y resistente",
            "Diseño exclusivo de la marca",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-dis-01",
        nombre: "Bolsa Sierras",
        subtitulo: "Pack x50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio2.webp",
        categoria: "disenos",
        descripcion: "Diseños abstractos y modernos.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica liviana y resistente",
            "Diseño exclusivo de la marca",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-dis-03",
        nombre: "Bolsa Unión",
        subtitulo: "Pack x50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio3.webp",
        categoria: "disenos",
        descripcion: "Diseño conceptual exclusivo.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica liviana y resistente",
            "Diseño exclusivo de la marca",
            "Reutilizable y fácil de limpiar"
        ]
    },
    {
        id: "bols-dis-04",
        nombre: "Bolsa Jardín",
        subtitulo: "Pack x50 unidades",
        precio: 12000,
        imagen: "assets/img/disenio4.webp",
        categoria: "disenos",
        descripcion: "Diseño botánico sobre tela rústica.",
        caracteristicas: [
            "Medidas: 45 × 40 × 10 cm",
            "Tela ecológica liviana y resistente",
            "Diseño exclusivo de la marca",
            "Reutilizable y fácil de limpiar"
        ]
    },

    // --- BOLSAS DE PAPEL ---
    {
        id: "bols-pap-00",
        nombre: "Bolsa manija retorcida",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/prod5.webp",
        categoria: "papel",
        descripcion: "Clásica y resistente bolsa de papel Kraft.",
        caracteristicas: [
            "Papel kraft resistente",
            "Manijas de cordón reforzadas",
            "Mayor capacidad de carga",
            "Ideal para productos más pesados"
        ]
    },
    {
        id: "bols-pap-01",
        nombre: "Bolsa manija troquelada",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/papel2.webp",
        categoria: "papel",
        descripcion: "Práctica y económica para despacho.",
        caracteristicas: [
            "Papel kraft resistente",
            "Manija troquelada integrada",
            "Formato práctico para entrega",
            "Ideal para delivery y take away"
        ]
    },
    {
        id: "bols-pap-02",
        nombre: "Bolsa manija plana",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/papel3.webp",
        categoria: "papel",
        descripcion: "Resistente y versátil para gastronomía.",
        caracteristicas: [
            "Papel kraft resistente",
            "Manijas planas reforzadas",
            "Base amplia para mayor capacidad",
            "Ideal para tiendas y retail"
        ]
    },
    {
        id: "bols-pap-03",
        nombre: "Bolsa papel tipo sobre",
        subtitulo: "Pack x100 unidades",
        precio: 10000,
        imagen: "assets/img/papel4.webp",
        categoria: "papel",
        descripcion: "Ideal para delivery y productos pequeños.",
        caracteristicas: [
            "Papel kraft resistente",
            "Cierre superior plegable",
            "Formato liviano y funcional",
            "Ideal para productos pequeños"
        ]
    },

    // --- BOLSAS BIODEGRADABLES ---
    {
        id: "bols-bio-00",
        nombre: "Bolsa tipo camiseta",
        subtitulo: "Pack x100 unidades",
        precio: 10000,
        imagen: "assets/img/prod6.webp",
        categoria: "biodegradables",
        descripcion: "Fabricada con materiales compostables certificados.",
        caracteristicas: [
            "Material biodegradable resistente",
            "Formato tipo camiseta con asas",
            "Amplia capacidad de carga",
            "Ideal para compras y uso diario"
        ]
    },
    {
        id: "bols-bio-01",
        nombre: "Bolsa manija troquelada",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/biod2.webp",
        categoria: "biodegradables",
        descripcion: "Resistente y totalmente amigable con el ambiente.",
        caracteristicas: [
            "Material biodegradable resistente",
            "Manija troquelada integrada",
            "Formato práctico para entrega",
            "Ideal para delivery y take away"
        ]
    },
    {
        id: "bols-bio-02",
        nombre: "Bolsa tipo sobre",
        subtitulo: "Pack x50 unidades",
        precio: 10000,
        imagen: "assets/img/biod3.webp",
        categoria: "biodegradables",
        descripcion: "Práctica para empaques sustentables.",
        caracteristicas: [
            "Material biodegradable flexible",
            "Formato liviano y adaptable",
            "Fácil de manipular y almacenar",
            "Ideal para envolver o proteger productos"
        ]
    },

    // --- COMPOSTERAS ---
    {
        id: "comp-02",
        nombre: "Compostera Simple 60lt",
        subtitulo: "Módulo individual",
        precio: 200000,
        imagen: "assets/img/compost1.webp",
        categoria: "composteras",
        descripcion: "Compartimiento simple ideal para balcones.",
        caracteristicas: [
            "Estructura resistente y duradera",
            "Sistema de ventilación integrado",
            "Fácil de usar y mantener",
            "Ideal para compostaje doméstico"
        ]
    },
    {
        id: "comp-01",
        nombre: "Compostera Doble 120lt",
        subtitulo: "Módulo doble",
        precio: 300000,
        imagen: "assets/img/compost2.webp",
        categoria: "composteras",
        descripcion: "Doble compartimento para proceso continuo.",
        caracteristicas: [
            "Doble compartimento independiente",
            "Permite compostaje continuo",
            "Estructura resistente y estable",
            "Ideal para mayor volumen de residuos"
        ]
    },
    {
        id: "comp-04",
        nombre: "Compostera 60lt + Kit",
        subtitulo: "Combo inicial",
        precio: 220000,
        imagen: "assets/img/compost3.webp",
        categoria: "composteras",
        descripcion: "Compostera simple cargada con todo el kit.",
        caracteristicas: [
            "Sistema de compostaje completo",
            "Incluye accesorios de uso (pala, guantes, cesto y bandejas)",
            "Diseño práctico y funcional",
            "Ideal para comenzar a compostar"
        ]
    },
    {
        id: "comp-03",
        nombre: "Compostera 120lt + Kit",
        subtitulo: "Combo Pro",
        precio: 320000,
        imagen: "assets/img/compost4.webp",
        categoria: "composteras",
        descripcion: "La solución definitiva para tu jardín.",
        caracteristicas: [
            "Doble compartimento independiente",
            "Incluye accesorios de uso (pala, guantes, cesto y bandejas)",
            "Permite compostaje continuo",
            "Ideal para uso intensivo o familiar"
        ]
    },
    {
        id: "comp-05",
        nombre: "Kit de Herramientas",
        subtitulo: "Accesorios para compost",
        precio: 40000,
        imagen: "assets/img/compost5.webp",
        categoria: "composteras",
        descripcion: "Herramientas diseñadas para compostar.",
        caracteristicas: [
            "Incluye pala, guantes, bandejas y cesto de residuos",
            "Práctico y fácil de utilizar",
            "Accesorios esenciales para compostar",
            "Ideal para iniciarse en el compostaje"
        ]
    }
];

// --- UTILIDADES GLOBALES ---

/**
 * Obtiene la ruta base según la ubicación del archivo HTML relativo a la raíz.
 * Centralizado en data.js por ser el primer archivo en cargar.
 */
window.obtenerPathBase = () => window.location.pathname.includes('/pages/') ? '../' : './';

/**
 * Formatea un número como moneda local (centralizado)
 */
window.formatearPrecio = (valor) => `$${valor.toLocaleString()}`;

/**
 * Constantes centralizadas de negocio
 */
window.MIN_COMPRA = 20000;
window.MIN_ENVIO_GRATIS = 50000;

// Costos de Envío por Zona
window.SHIPPING_CABA = 2000;
window.SHIPPING_BSAS = 3000;
window.SHIPPING_RESTO = 5000;

// --- UTILIDADES DE DATOS ---

/**
 * Mapa centralizado de nombres de categorías para consistencia en todo el sitio
 */
const nombresCategorias = {
    'ecologicas': 'Bolsas de tela lisas',
    'composteras': 'Composteras',
    'personalizadas': 'Bolsas personalizadas',
    'papel': 'Bolsas de papel',
    'biodegradables': 'Bolsas biodegradables',
    'disenos': 'Bolsas de tela con diseños'
};

/**
 * Filtra los productos por su categoría
 */
const obtenerProductosPorCategoria = (categoria) => {
    if (!categoria) return productos; // Devuelve todo si no hay categoría
    return productos.filter(p => p.categoria === categoria);
};

/**
 * Busca productos por coincidencia inteligente en nombre, descripción, subtítulo o categoría.
 * Maneja múltiples palabras y coincidencias con nombres de categorías.
 */
const obtenerProductosPorBusqueda = (termino) => {
    if (!termino) return [];

    // Normalizamos el término: minúsculas y sin espacios extra al inicio/final
    const lowerTerm = termino.toLowerCase().trim();

    // 1. Verificamos si el término coincide exactamente con el NOMBRE de una categoría
    // Ejemplo: Si busca "bolsas de tela" o "composteras"
    const catKeys = Object.keys(nombresCategorias);
    const matchedCat = catKeys.find(key =>
        nombresCategorias[key].toLowerCase() === lowerTerm ||
        key.toLowerCase() === lowerTerm
    );

    // Si es una categoría, devolvemos todos los productos de esa categoría
    if (matchedCat) {
        return productos.filter(p => p.categoria === matchedCat);
    }

    // 2. Si no es una categoría exacta, hacemos búsqueda por palabras
    const palabras = lowerTerm.split(/\s+/).filter(p => p.length > 2); // palabras de más de 2 letras

    return productos.filter(p => {
        // Creamos un súper-texto con toda la info del producto para buscar ahí
        const nombreCat = nombresCategorias[p.categoria] || "";
        const searchableText = `
            ${p.nombre} 
            ${p.descripcion} 
            ${p.subtitulo || ""} 
            ${p.categoria} 
            ${nombreCat} 
            ${p.caracteristicas ? p.caracteristicas.join(" ") : ""}
        `.toLowerCase();

        // Coincidencia exacta del término completo (Prioridad)
        if (searchableText.includes(lowerTerm)) return true;

        // Si hay varias palabras, verificamos que TODAS las palabras significativas estén presentes
        if (palabras.length > 0) {
            return palabras.every(pal => searchableText.includes(pal));
        }

        return false;
    });
};
