// 1. BASE DE DATOS DE PRODUCTOS
// La definimos en 'window' para que sea accesible desde cart.js y otros scripts
window.products = [
    {
        id: 1,
        name: "T-SHIRT BASIC",
        price: "45.00",
        image: "src/assets/images/coche.png",
        description: "Camiseta de corte oversized confeccionada en algodón pesado de 280gsm. Estampado en serigrafía de alta densidad en la espalda y logo bordado en el pecho. Lavado ácido para efecto vintage.",
        specs: ["100% Algodón Orgánico", "Hecho en Portugal", "Heavyweight Jersey"]
    },
    {
        id: 2,
        name: "HOODIE BLACK",
        price: "85.00",
        image: "src/assets/images/coche.png",
        description: "Sudadera con capucha de corte boxy. Felpa francesa de 400gsm para máxima durabilidad y confort. Bolsillo canguro reforzado y cordones con puntas metálicas.",
        specs: ["100% Algodón", "Pre-shrunk", "Oversized Fit"]
    },
    {
        id: 3,
        name: "CAP LOGO",
        price: "30.00",
        image: "src/assets/images/coche.png",
        description: "Gorra estructurada de 6 paneles con el logo icónico bordado en 3D. Cierre ajustable metálico y visera curvada preformada.",
        specs: ["Ajustable", "Bordado 3D", "Algodón Twill"]
    },
    {
        id: 4,
        name: "LONG SLEEVE",
        price: "55.00",
        image: "src/assets/images/coche.png",
        description: "Camiseta de manga larga con puños acanalados y gráficos en las mangas. Tejido transpirable ideal para layering o uso individual.",
        specs: ["Algodón Orgánico", "Print en mangas", "Regular Fit"]
    },
    {
        id: 5,
        name: "PANTS WIDE",
        price: "90.00",
        image: "src/assets/images/coche.png",
        description: "Pantalones anchos estilo cargo con múltiples bolsillos funcionales. Cintura elástica con cordón y bajos ajustables.",
        specs: ["Nylon Técnico", "Water Repellent", "Wide Leg"]
    },
    {
        id: 6,
        name: "ACCESSORY",
        price: "25.00",
        image: "src/assets/images/coche.png",
        description: "Accesorio exclusivo de la colección 2025. Fabricado en acero inoxidable con acabado mate y grabado láser de precisión.",
        specs: ["Acero Inoxidable", "Grabado Láser", "Unisex"]
    }
];

// 2. LÓGICA DE CARGA DE PÁGINA (RENDER)
document.addEventListener('DOMContentLoaded', () => {

    // --- ESCENARIO 1: HOME (GRILLA DE PRODUCTOS) ---
    const productGrid = document.querySelector('.product-grid');

    if (productGrid) {
        productGrid.innerHTML = '';

        window.products.forEach(product => {
            const cardHTML = `
                <article class="product-card">
                    <a href="product.html?id=${product.id}" class="product-link">
                        <div class="image-container">
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x500/111/fff?text=ITEM'">
                        </div>
                        <div class="product-info">
                            <span class="product-price">€${product.price}</span>
                        </div>
                    </a>
                    <!-- Llamamos a addToCart que está en cart.js -->
                    <button class="btn-add" onclick="if(window.addToCart) addToCart(${product.id}, 'M')">ADD TO CART</button>
                </article>
            `;
            productGrid.innerHTML += cardHTML;
        });
    }

    // --- ESCENARIO 2: PÁGINA DE PRODUCTO INDIVIDUAL ---
    const productDetailSection = document.querySelector('.product-details-section');

    if (productDetailSection) {
        const params = new URLSearchParams(window.location.search);
        // Si no hay ID, usamos el 1 por defecto para evitar errores visuales
        const productId = parseInt(params.get('id')) || 1;
        const product = window.products.find(p => p.id === productId);

        if (product) {
            // Rellenar Textos e Imagen
            document.querySelector('.p-title').innerHTML = product.name + "<br>EDITION 01";
            document.querySelector('.p-price').textContent = "€" + product.price;
            document.querySelector('.product-image-section img').src = product.image;
            document.querySelector('.details-description p').textContent = product.description;
            document.querySelector('.add-to-cart-btn').textContent = `ADD TO CART — €${product.price}`;

            // Specs
            const specsList = document.querySelector('.specs-list');
            specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

            // Título de la pestaña
            document.title = `PECATO | ${product.name}`;

            // Asignar función al botón de añadir
            const addBtn = document.querySelector('.add-to-cart-btn');
            addBtn.onclick = function () {
                // Obtener talla seleccionada
                const selectedSizeInput = document.querySelector('input[name="size"]:checked');
                const size = selectedSizeInput ? selectedSizeInput.value : 'M';

                // Llamar a la función global del carrito
                if (typeof window.addToCart === 'function') {
                    window.addToCart(product.id, size);
                } else {
                    console.error("Error: cart.js no está cargado o addToCart no existe.");
                }
            };
        }
    }
});