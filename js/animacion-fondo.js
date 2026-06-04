const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const COLOR = '#bbb800';
    const CANTIDAD = 80;
    const DISTANCIA_CONEXION = 140;

    const particulas = Array.from({ length: CANTIDAD }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radio: Math.random() * 2 + 1
    }));

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particulas.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
            ctx.fillStyle = COLOR;
            ctx.globalAlpha = 0.7;
            ctx.fill();
        });

        for (let i = 0; i < particulas.length; i++) {
            for (let j = i + 1; j < particulas.length; j++) {
                const dx = particulas[i].x - particulas[j].x;
                const dy = particulas[i].y - particulas[j].y;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                if (distancia < DISTANCIA_CONEXION) {
                    ctx.beginPath();
                    ctx.moveTo(particulas[i].x, particulas[i].y);
                    ctx.lineTo(particulas[j].x, particulas[j].y);
                    ctx.strokeStyle = COLOR;
                    ctx.globalAlpha = 1 - distancia / DISTANCIA_CONEXION;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animar);
    }

    animar();