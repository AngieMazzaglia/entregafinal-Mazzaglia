const productos = [


    // --- BOLSAS PERSONALIZADAS ---
    {
        id: "bols-pers-01",
        nombre: "Bolsas personalizadas",
        subtitulo: "A medida con tu logo",
        precio: "Pedir cotización",
        imagen: "assets/img/prod1.webp",
        categoria: "personalizadas",
        descripcion: "Personalizá tus bolsas con el diseño o logo de tu marca.",
        caracteristicas: [
            "Impresión de alta calidad",
            "Diferentes tamaños disponibles",
            "Materiales ecológicos",
            "Asesoramiento personalizado"
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
            "Medidas: 45x40x10 cm",
            "Tela ecológica 80gr",
            "Manijas reforzadas",
            "Lavable y reutilizable"
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
            "Medidas: 45x40x10 cm",
            "Color vibrante y duradero",
            "Costuras reforzadas",
            "Ideal para compras diarias"
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
            "Material 100% reciclable",
            "Soporta hasta 15kg",
            "Fácil de plegar y guardar",
            "Estilo minimalista"
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
            "Resistente a la humedad",
            "Gran capacidad interna",
            "Ideal para regalos corporativos",
            "Amigable con el medio ambiente"
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
            "Variedad de colores primarios",
            "Material Friselina 80gr",
            "Ideal para eventos y ferias",
            "Excelente relación precio-calidad"
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
            "Estampa premium",
            "Diseño artístico único",
            "Tela reforzada",
            "Pack surtido"
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
            "Varios modelos por pack",
            "Gama de colores tierra",
            "Alta durabilidad",
            "Tendencia sustentable"
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
            "Arte minimalista",
            "Tintas al agua no tóxicas",
            "Tamaño estándar 40x40",
            "Edición limitada"
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
            "Look natural",
            "Detalle de terminación premium",
            "Ideal para viveros y tiendas eco",
            "Biodegradable"
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
            "Papel Kraft 120gr",
            "Manija de papel reforzada",
            "Reciclable y compostable",
            "Fondo reforzado"
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
            "Diseño tipo riñón",
            "Papel de alta densidad",
            "Ideal para indumentaria",
            "Muy resistente"
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
            "Apta para alimentos",
            "Fácil apertura",
            "Estética rústica",
            "Certificación FSC"
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
            "Sin manija",
            "Ocupa mínimo espacio",
            "Económica",
            "Perfecta para panaderías"
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
            "100% Compostable",
            "Se degrada en 180 días",
            "Textura suave y resistente",
            "Cumple norma EN 13432"
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
            "Material de origen vegetal",
            "Sin plásticos derivados del petróleo",
            "Resistencia superior",
            "Versión premium"
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
            "Cierre fácil",
            "Ideal para e-commerce",
            "Reducción de huella de carbono",
            "Color natural"
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
            "Capacidad 60 litros",
            "Madera tratada",
            "Incluye bandeja de lixiviados",
            "Medidas: 40x40x60 cm"
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
            "Capacidad total 120 litros",
            "División interna",
            "Puertas superiores amplias",
            "Ideal para familias"
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
            "Incluye herramientas",
            "Manual de compostaje",
            "Activador biológico",
            "Unidad completa"
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
            "Caja de herramientas premium",
            "Mezclador para aireación",
            "Terapia de núcleos de lombriz",
            "Máximo rendimiento"
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
            "Pala y rastrillo de mano",
            "Termómetro de suelo",
            "Medidor de humedad",
            "Bolsa de tela incluida"
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
window.MIN_COMPRA = 15000;
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
