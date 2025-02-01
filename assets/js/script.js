// Evento de carga del DOM
document.addEventListener("DOMContentLoaded", function () {
    console.log("Inicializando sistema...");

    // Verificar si es móvil
    let isMobile = window.innerWidth <= 430;

    // Configurar partículas
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": isMobile ? 30 : 250,
                "density": {
                    "enable": true,
                    "value_area": isMobile ? 600 : 1200
                }
            },
            "color": { "value": "#0ff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.8, "random": true },
            "size": { "value": isMobile ? 2 : 3, "random": true },
            "move": {
                "enable": true,
                "speed": isMobile ? 1 : 4,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": true
            },
            "line_linked": {
                "enable": true,
                "distance": isMobile ? 90 : 200,
                "color": "#00f7ff",
                "opacity": 0.5,
                "width": isMobile ? 1 : 3
            }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": false, "mode": "push" }
            }
        },
        "retina_detect": true
    });

    // 📌 Gestión del menú de WiFi y sus categorías
    const wifiButton = document.getElementById("wifi");
    const wifiCategories = document.getElementById("wifiCategories");
    const categoryContainer = document.getElementById("category-container");
    const categoryButtons = document.querySelectorAll(".category-btn");

    // Datos de botones según categoría
    const buttonData = {
        diplomacy: [
            "Escanear Redes",
            "Conectar a WiFi",
            "Administrar Redes",
            "Cambiar MAC",
            "Bloquear Dispositivo",
            "Crear Hotspot"
        ],
        recon: [
            "Monitorear Tráfico",
            "Escanear Dispositivos",
            "Probar Seguridad WiFi",
            "Detectar Vulnerabilidades",
            "Análisis de Puertos"
        ],
        infiltration: [
            "Deauth (Expulsar Usuarios)",
            "Crear Fake WiFi",
            "Ataque WPS",
            "Jammer (Interferencia WiFi)",
            "Interceptar Paquetes",
            "Clonar MAC de Dispositivo"
        ]
    };

    if (wifiButton && wifiCategories) {
        wifiButton.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Clic en WiFi detectado"); // Verificar si el evento se activa
            wifiCategories.classList.toggle("show");
        });
    } else {
        console.error("Error: No se encontró el botón WiFi o el submenú.");
    }

    // Mostrar botones de acciones según categoría
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            showCategoryButtons(category);
        });
    });

    function showCategoryButtons(category) {
        categoryContainer.innerHTML = "";
        categoryContainer.classList.remove("hidden");

        buttonData[category].forEach(text => {
            const btn = document.createElement("button");
            btn.classList.add("function-btn");
            btn.textContent = text;
            categoryContainer.appendChild(btn);
        });
    }

    // 📌 Validación de credenciales
    document.querySelector(".login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username === "admin" && password === "admin1991") {
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("mainUI").style.display = "block";
        } else {
            alert("Acceso denegado. Verifique sus credenciales.");
        }
    });
});

test