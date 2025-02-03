document.addEventListener("DOMContentLoaded", function () {
    console.log("Inicializando sistema...");

    const wifiButton = document.getElementById("wifi");
    const wifiCategories = document.getElementById("wifiCategories");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const galleryContainer = document.getElementById("gallery-container");
    const gallery = document.getElementById("gallery");
    const loginForm = document.querySelector(".login-form");
    const loginPage = document.getElementById("loginPage");
    const mainUI = document.getElementById("mainUI");
    const stealthButton = document.getElementById("stealth");

    let stealthMode = false;
    let clickCount = 0;
    let clickTimer;
    let inactivityTimer;
    let galleryRecentlyOpened = false;

    // 🔹 Asegurar que la galería y el submenú estén ocultos al inicio
    wifiCategories.classList.add("hidden");
    galleryContainer.classList.add("hidden");

    // ✅ Restaurar validación de credenciales (LOGIN)
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            if (username === "admin" && password === "admin1991") {
                console.log("Acceso concedido");
                loginPage.style.display = "none";
                mainUI.style.display = "block";
            } else {
                alert("Acceso denegado. Verifique sus credenciales.");
            }
        });
    }

    // 🎯 Evento para mostrar/ocultar el submenú WiFi
    wifiButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Clic en WiFi detectado");

        if (wifiCategories.classList.contains("hidden")) {
            wifiCategories.classList.remove("hidden");
            wifiCategories.classList.add("show");
        } else {
            wifiCategories.classList.remove("show");
            wifiCategories.classList.add("hidden");
        }

        // Ocultar la galería cuando se abre el submenú WiFi
        galleryContainer.classList.add("hidden");
    });

    // 🎯 Evento para mostrar la galería al hacer clic en una opción del submenú
    categoryButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            const category = this.getAttribute("data-category");
            console.log(`✅ Clic detectado en: ${category}`);

            // Limpiar la galería antes de agregar nuevas imágenes
            gallery.innerHTML = "";

            // Verificar si la categoría existe
            if (!galleryData[category]) {
                console.error("❌ Categoría no encontrada:", category);
                return;
            }

            // Crear y agregar elementos de la galería
            const fieldset = document.createElement("fieldset");

            galleryData[category].forEach(item => {
                const card = document.createElement("div");
                card.classList.add("gallery-item");
                card.style.backgroundImage = `url(${item.img})`;

                const overlay = document.createElement("div");
                overlay.classList.add("overlay");
                overlay.innerHTML = `<h3>${item.title}</h3>`;

                card.appendChild(overlay);
                fieldset.appendChild(card);
            });

            gallery.appendChild(fieldset);

            // Mostrar la galería
            galleryContainer.classList.remove("hidden");
            galleryContainer.style.top = "20%";
            galleryContainer.style.left = "50%";
            galleryContainer.style.width = "90vw"; 
            galleryContainer.style.maxWidth = "1200px";
            galleryContainer.style.transform = "translateX(-50%)";
            setTimeout(() => {
                galleryContainer.style.opacity = "1";
            }, 100);
        });
    });

    // Evento para cerrar la galería si se hace clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!galleryContainer.contains(event.target) && !event.target.classList.contains("category-btn")) {
            console.log("📌 Clic fuera de la galería, ocultándola...");
            galleryContainer.classList.add("hidden");
        }
    });

    // 📌 ⏰ Función para mostrar el reloj digital
    function startClock() {
        const clock = document.createElement("div");
        clock.id = "clock";
        clock.className = "clock";
        clock.style.position = "absolute";
        clock.style.top = "50%";
        clock.style.left = "50%";
        clock.style.transform = "translate(-50%, -50%)";
        clock.style.color = "rgba(23, 26, 26, 0.75)";
        clock.style.fontFamily = "Orbitron, sans-serif";
        document.body.appendChild(clock);

        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("es-ES", { hour12: false });
            clock.innerText = timeString;
        }, 1000);
    }

    // 📌 🔥 Función para activar/desactivar "Stealth Mode"
    stealthButton.addEventListener("click", function () {
        stealthMode = !stealthMode;

        if (stealthMode) {
            console.log("🔹 Modo Stealth ACTIVADO");
            document.body.style.background = "white";

            document.querySelectorAll("#menu, #gallery-container, .login-container").forEach(el => {
                el.style.display = "none";
            });

            startClock();
            resetInactivityTimer();
        } else {
            console.log("🔹 Modo Stealth DESACTIVADO");
            document.body.style.background = "";

            document.querySelectorAll("#menu, #gallery-container, .login-container").forEach(el => {
                el.style.display = "block";
            });

            const clock = document.getElementById("clock");
            if (clock) clock.remove();

            clearTimeout(inactivityTimer);
        }
    });

    // 📌 🖱️ Detectar 3 clics en menos de 1 segundo
    document.addEventListener("click", function () {
        if (stealthMode) {
            clickCount++;

            if (!clickTimer) {
                clickTimer = setTimeout(() => {
                    if (clickCount >= 3) {
                        console.log("🔄 Redirigiendo al LOGIN...");
                        window.location.reload();
                    }
                    clickCount = 0;
                    clearTimeout(clickTimer);
                    clickTimer = null;
                }, 1000);
            }
        }
    });

    // 📌 ⏳ Detectar inactividad y redirigir a eBay después de 10 min
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            console.log("⏳ Redirigiendo a eBay por inactividad...");
            window.location.href = "https://www.ebay.com";
        }, 10 * 60 * 1000);
    }

    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);
});

// 🔥 Base de datos de imágenes con nombre y descripción
const galleryData = {
    diplomacy: [
        { title: "Escanear Redes", img: "https://assets.codepen.io/2585/fiddle-leaf.jpeg" },
        { title: "Conectar a WiFi", img: "https://assets.codepen.io/2585/pink-princess.jpeg" },
        { title: "Gestión de Redes", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" },
        { title: "Cambiar MAC", img: "https://assets.codepen.io/2585/pothos.jpeg" },
        { title: "Bloquear Dispositivo", img: "https://assets.codepen.io/2585/rubber-tree.webp" },
        { title: "Crear Hotspot", img: "https://assets.codepen.io/2585/fiddle-leaf.jpeg" }
    ],
    recon: [
        { title: "Monitorear Tráfico", img: "https://assets.codepen.io/2585/pink-princess.jpeg" },
        { title: "Escanear Dispositivos", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" },
        { title: "Probar Seguridad WiFi", img: "https://assets.codepen.io/2585/pothos.jpeg" },
        { title: "Detectar Vulnerabilidades", img: "https://assets.codepen.io/2585/rubber-tree.webp" },
        { title: "Análisis de Puertos", img: "https://assets.codepen.io/2585/fiddle-leaf.jpeg" }
    ],
    infiltration: [
        { title: "Deauth (Expulsar Usuarios)", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" },
        { title: "Crear Fake WiFi", img: "https://assets.codepen.io/2585/pothos.jpeg" },
        { title: "Ataque WPS", img: "https://assets.codepen.io/2585/rubber-tree.webp" },
        { title: "Jammer (Interferencia WiFi)", img: "https://assets.codepen.io/2585/fiddle-leaf.jpeg" },
        { title: "Interceptar Paquetes", img: "https://assets.codepen.io/2585/pink-princess.jpeg" },
        { title: "Clonar MAC de Dispositivo", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" }
    ]
};