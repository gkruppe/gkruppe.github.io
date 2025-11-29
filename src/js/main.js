document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos los elementos clave
    const sentinel = document.getElementById('sticky-sentinel');
    const navbar = document.getElementById('navbar');

    // Verificamos que existan para evitar errores
    if (!sentinel || !navbar) return;

    // 2. Creamos el Observador (Intersection Observer)
    // Es como un vigilante que nos avisa cuando el 'sentinel' entra o sale de la pantalla
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            // LÓGICA:
            // Si el centinela NO está visible (!isIntersecting)
            // Y además está por ENCIMA de la pantalla (top < 0)
            // Significa que hemos bajado haciendo scroll.

            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                // Estamos abajo: ¡Modo Sticky activado!
                navbar.classList.add('stuck');
            } else {
                // Estamos arriba: Modo normal
                navbar.classList.remove('stuck');
            }
        });
    }, {
        // Opciones del observador
        threshold: 0, // Se activa apenas el pixel 0 del elemento sale
        rootMargin: "0px 0px 0px 0px" // Sin márgenes extra
    });

    // 3. Empezamos a observar
    observer.observe(sentinel);
});