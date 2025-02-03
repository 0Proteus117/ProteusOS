function resizeCanvas() {
    let isPortrait = window.innerHeight > window.innerWidth; // Detecta si el móvil está en vertical
    let isIphone = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

    const canvas = document.getElementById("particlesCanvas");
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Si es un iPhone y está en modo vertical, aseguramos el ajuste correcto
        if (isIphone && isPortrait) {
            canvas.style.width = "100vw";
            canvas.style.height = "100vh";
        }
    }
}

function adjustParticleFilter() {
    if (window.innerWidth <= 430) {
        document.getElementById("particles-js").style.filter = "brightness(0.6) contrast(1.2)";
    } else {
        document.getElementById("particles-js").style.filter = "brightness(1) contrast(1)";
    }
}

// Ejecutar al cargar y cuando la pantalla cambie de tamaño
adjustParticleFilter();
window.addEventListener("resize", adjustParticleFilter);

// Ejecutar la función en la carga de la página y en cambios de tamaño
window.addEventListener("resize", resizeCanvas);
window.addEventListener("DOMContentLoaded", resizeCanvas);

particlesJS("particles-js", {
        
    detect_on: "canvas",
        
        particles: {
            // Aquí va toda tu configuración de partículas...
            number: {
                value: isMobile ? 2000 : 300,  // Multiplicamos por 50 en móviles
                density: { 
                    enable: true, 
                    "value_area": isIphone && isPortrait ? 1400 : isMobile ? 800 : 1200 
                }
            },

            color: { 
                value: isMobile ?"rgb(78, 245, 251)" : "#00f7ff",
            },

            shape: { 
                type: "circle" 
            },

            opacity: { 
                value: 0.8, 
                random: true 
            },

            size: { 
                value: isMobile ? 2 : 3, 
                random: true 
            },

            line_linked: {
                enable: true,
                distance: isMobile ? 120 : 200,
                color: "#00f7ff",
                opacity: 1,
                width: isMobile ? 2 : 3
            },
            
            move: {
                enable: true,
                speed: isMobile ? 1 : 3,
                direction: "none",
                random: true,  // Desactivamos movimientos completamente aleatorios
                straight: false,
                out_mode: "bounce",  // Asegura que NO atraviesen los bordes
                bounce: true,  // Activa el rebote real
                attract: { 
                    enable: false, 
                    rotateX: 600, 
                    rotateY: 1200 
                }  // Reducimos la atracción
                
            },    
    },
        interactivity: {
            events: {
                onhover: { 
                    enable: true, 
                    mode: "grab" 
                },  // Cambiamos "repulse" por "grab"

                onclick: { 
                    enable: true, 
                    mode: "push" 
                }

            },
            
            modes: {
                grab: { 
                    distance: 180, 
                    line_linked: { opacity: 1 } 
                },  // Aumentamos la distancia de agarre

                repulse: { 
                    distance: 250, 
                    duration: 0.8 
                },  // Ahora repelerá con más fuerza
                
                push: { 
                    particles_nb: 4 
                }

            }
    },
    retina_detect: true
});