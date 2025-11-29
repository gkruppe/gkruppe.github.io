document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DEL STICKY NAVBAR ---
    const sentinel = document.getElementById('sticky-sentinel');
    const navbar = document.getElementById('navbar');

    if (sentinel && navbar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    navbar.classList.add('stuck');
                } else {
                    navbar.classList.remove('stuck');
                }
            });
        }, {
            threshold: 0,
            rootMargin: "0px 0px 0px 0px"
        });

        observer.observe(sentinel);
    }

    // --- 2. LÓGICA DEL MENÚ DESPLEGABLE ---
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');

    if (openMenuBtn && closeMenuBtn && menuOverlay) {
        openMenuBtn.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
        });

        closeMenuBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Reactivar scroll
        });

        // Cerrar al hacer clic en un enlace
        const menuLinks = menuOverlay.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 3. LÓGICA DEL CARRITO DESPLEGABLE ---
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');

    if (openCartBtn && closeCartBtn && cartOverlay) {
        openCartBtn.addEventListener('click', () => {
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCartBtn.addEventListener('click', () => {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});