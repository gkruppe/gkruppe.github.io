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
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menuOverlay = document.getElementById('menu-overlay');

    if (openBtn && closeBtn && menuOverlay) {

        // Abrir Menú
        openBtn.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            // Bloquear el scroll de la página web
            document.body.style.overflow = 'hidden';
        });

        // Cerrar Menú
        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            // Reactivar el scroll
            document.body.style.overflow = '';
        });

        // Cerrar al hacer clic en un enlace (opcional, para navegar)
        const links = menuOverlay.querySelectorAll('.menu-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});