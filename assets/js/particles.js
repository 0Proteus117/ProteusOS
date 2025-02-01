let isMobile = window.innerWidth <= 430;

particlesJS("particles-js", {
        detect_on: "canvas",
        particles: {
            // Aquí va toda tu configuración de partículas...
        number: {
            value: isMobile ? 2000 : 300,  // Multiplicamos por 50 en móviles
            density: { enable: true, value_area: isMobile ? 2000 : 1600 }
        },
        color: { value: "#00f7ff" },
        shape: { type: "circle" },
        opacity: { value: 0.8, random: true },
        size: { value: isMobile ? 2 : 3, random: true },
        line_linked: {
            enable: true,
            distance: isMobile ? 120 : 200,
            color: "#00f7ff",
            opacity: 0.5,
            width: isMobile ? 2 : 3
        },
        move: {
            enable: true,
            speed: isMobile ? 1 : 3,
            direction: "none",
            random: false,  // Desactivamos movimientos completamente aleatorios
            straight: false,
            out_mode: "bounce",  // Asegura que NO atraviesen los bordes
            bounce: true,  // Activa el rebote real
            attract: { enable: false, rotateX: 600, rotateY: 1200 }  // Reducimos la atracción
        },
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "grab" },  // Cambiamos "repulse" por "grab"
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 180, line_linked: { opacity: 1 } },  // Aumentamos la distancia de agarre
            repulse: { distance: 250, duration: 0.8 },  // Ahora repelerá con más fuerza
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});