// 1. BASE DE DATOS DE PRODUCTOS
const products = [
    {
        id: 1,
        name: "T-SHIRT BASIC",
        price: "€45.00",
        // Recuerda: ../ porque el script se llama desde dentro de la estructura
        image: "../src/assets/images/coche.png",
        // DESCRIPCIÓN COMPLETA RESTAURADA
        description: "Camiseta de corte oversized confeccionada en algodón pesado de 280gsm. Estampado en serigrafía de alta densidad en la espalda y logo bordado en el pecho. Lavado ácido para efecto vintage.",
        specs: ["100% Algodón Orgánico", "Hecho en Portugal", "Heavyweight Jersey"]
    },
    {
        id: 2,
        name: "HOODIE BLACK",
        price: "€85.00",
        image: "../src/assets/images/coche.png",
        description: "Sudadera con capucha de corte boxy. Felpa francesa de 400gsm para máxima durabilidad y confort. Bolsillo canguro reforzado y cordones con puntas metálicas.",
        specs: ["100% Algodón", "Pre-shrunk", "Oversized Fit"]
    },
    {
        id: 3,
        name: "CAP LOGO",
        price: "€30.00",
        image: "../src/assets/images/coche.png",
        description: "Gorra estructurada de 6 paneles con el logo icónico bordado en 3D. Cierre ajustable metálico y visera curvada preformada.",
        specs: ["Ajustable", "Bordado 3D", "Algodón Twill"]
    },
    {
        id: 4,
        name: "LONG SLEEVE",
        price: "€55.00",
        image: "../src/assets/images/coche.png",
        description: "Camiseta de manga larga con puños acanalados y gráficos en las mangas. Tejido transpirable ideal para layering o uso individual.",
        specs: ["Algodón Orgánico", "Print en mangas", "Regular Fit"]
    },
    {
        id: 5,
        name: "PANTS WIDE",
        price: "€90.00",
        image: "../src/assets/images/coche.png",
        description: "Pantalones anchos estilo cargo con múltiples bolsillos funcionales. Cintura elástica con cordón y bajos ajustables.",
        specs: ["Nylon Técnico", "Water Repellent", "Wide Leg"]
    },
    {
        id: 6,
        name: "MYSTERY TEE / ARCHIVE DROP",
        price: "€40.00",
        image: "../src/assets/images/coche.png",
        description: "Acceso clasificado a nuestro archivo. Recibirás una camiseta seleccionada al azar de colecciones pasadas, muestras de pre-producción o diseños gráficos inéditos. Elige tu talla y acepta el riesgo. Venta final, sin devoluciones.",
        specs: ["Acero Inoxidable", "Grabado Láser", "Unisex"]
    }
];

// 2. LÓGICA DE RENDERIZADO
document.addEventListener('DOMContentLoaded', () => {

    // A. LÓGICA PARA LA HOME (GRILLA DE PRODUCTOS)
    const productGrid = document.querySelector('.product-grid');

    if (productGrid) {
        productGrid.innerHTML = '';

        products.forEach(product => {
            const cardHTML = `
                <article class="product-card">
                    <a href="product1.html?id=${product.id}" class="product-link">
                        <div class="image-container">
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x500/111/fff?text=ITEM'">
                        </div>
                        <div class="product-info">
                            <span class="product-price">${product.price}</span>
                        </div>
                    </a>
                    <button class="btn-add">ADD TO CART</button>
                </article>
            `;
            productGrid.innerHTML += cardHTML;
        });
    }

    // B. LÓGICA PARA LA PÁGINA DE PRODUCTO INDIVIDUAL
    const productDetailSection = document.querySelector('.product-details-section');

    if (productDetailSection) {
        const params = new URLSearchParams(window.location.search);
        const productId = parseInt(params.get('id'));

        // Si no hay ID en la URL, por defecto mostramos el producto 1 (T-SHIRT)
        // Esto evita que la página se rompa o redirija si entras directamente
        const product = products.find(p => p.id === (productId || 1));

        if (product) {
            // Usamos innerHTML para permitir etiquetas como <br> si hiciera falta
            document.querySelector('.p-title').innerHTML = product.name + "<br>EDITION 01";
            document.querySelector('.p-price').textContent = product.price;
            document.querySelector('.product-image-section img').src = product.image;

            // Aquí cargamos la descripción larga
            document.querySelector('.details-description p').textContent = product.description;

            document.querySelector('.add-to-cart-btn').textContent = `ADD TO CART — ${product.price}`;

            const specsList = document.querySelector('.specs-list');
            specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

            document.title = `PECATO | ${product.name}`;
        }
    }
});