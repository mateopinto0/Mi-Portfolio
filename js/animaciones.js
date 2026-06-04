const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }else {
            entry.target.classList.remove('visible'); 
        }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animar, .animar-izq, .animar-der').forEach(el => {
        observer.observe(el);
    });

    // Animación de escritura que ya tenías
    const presentacion = document.getElementById('presentacion');
    function reiniciarAnimacion() {
        presentacion.style.animation = 'none';
        void presentacion.offsetWidth;
        presentacion.style.animation = `
            typing 2.5s steps(18, end) forwards,
            blink 0.75s step-end infinite
        `;
    }
    setInterval(reiniciarAnimacion, 5000);