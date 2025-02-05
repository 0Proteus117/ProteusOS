document.addEventListener("DOMContentLoaded", function () {
    console.log("Inicializando sistema...");

    const wifiButton = document.getElementById("wifi");
    const wifiCategories = document.getElementById("wifiCategories");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const galleryContainer = document.getElementById("gallery-container");
    const gallery = document.getElementById("gallery");
    const stealthButton = document.getElementById("stealth");
    const passwordField = document.getElementById("password");
    const loginForm = document.querySelector(".login-form");
    const loginPage = document.getElementById("loginPage");
    const mainUI = document.getElementById("mainUI");
    const usernameField = document.getElementById("username");

    let stealthMode = false;
    let clickCount = 0;
    let clickTimer;
    let inactivityTimer;
    let galleryRecentlyOpened = false;
    let actualPassword = ""; // Guarda la contraseña real
    const symbols = "^][{+>?/=$@&~!-*#_%(})<("; // Símbolos aleatorios para la máscara

    // 🎭 Evento para capturar la contraseña con máscara
    if (passwordField) {
        passwordField.addEventListener("input", function (event) {
            console.log("📝 Entrada detectada en la contraseña.");

            if (event.inputType === "deleteContentBackward") {
                actualPassword = actualPassword.slice(0, -1); // Borra el último carácter si presionan "Backspace"
            } else {
                let newInput = event.data;
                if (!newInput) return; // Evita errores con teclas especiales

                actualPassword += newInput; // Guarda la contraseña real

                // Genera una máscara con símbolos aleatorios
                let maskedPassword = actualPassword.split("").map(() => {
                    return symbols[Math.floor(Math.random() * symbols.length)];
                }).join("");

                console.log("🔑 Contraseña real:", actualPassword);
                console.log("🕵️‍♂️ Mostrando en input:", maskedPassword);

                // Establece el valor en el input sin perder la posición del cursor
                passwordField.value = maskedPassword;
                setTimeout(() => {
                    passwordField.setSelectionRange(maskedPassword.length, maskedPassword.length);
                }, 0);
            }
        });

        // 🛑 Bloquear pegar contraseñas
        passwordField.addEventListener("paste", function (event) {
            event.preventDefault();
        });
    }

    // 🎯 Evento para validar credenciales al hacer login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = usernameField.value.trim();
            console.log("📝 Usuario ingresado:", username);
            console.log("🔑 Contraseña real ingresada:", actualPassword);

            if (username === "admin" && actualPassword === "admin1991") {
                console.log("✅ Acceso concedido");
                loginPage.style.display = "none";
                mainUI.style.display = "block";
            } else {
                console.log("❌ Usuario o contraseña incorrectos");
            }
        });
    }

    // 🎯 Evento para validar el login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita recargar la página

            let username = usernameField.value.trim();
            console.log("📝 Usuario ingresado:", username);
            console.log("🔑 Contraseña real ingresada:", actualPassword);

            // 🏆 Validación de credenciales
            if (username === "admin" && actualPassword === "admin1991") {
                console.log("✅ Acceso concedido");
                loginPage.style.display = "none"; // Ocultar pantalla de login
                mainUI.style.display = "block"; // Mostrar interfaz principal
            } else {
                console.log("❌ Usuario o contraseña incorrectos");
            }
        });
    }


    // 🔹 Función para mostrar el submenú con animación
    function showSubmenu() {
        wifiCategories.classList.remove("hidden"); // Primero, aseguramos que esté visible
        setTimeout(() => {
            wifiCategories.classList.add("show"); // Luego aplicamos la animación
        }, 10); // ⏳ Delay mínimo para activar la transición
    }

    // 🔹 Función para ocultar el submenú con animación
    function hideSubmenu() {
        wifiCategories.classList.remove("show");
        setTimeout(() => {
            wifiCategories.classList.add("hidden");
        }, 500); // ⏳ Delay para que la animación se complete antes de ocultarlo totalmente
    }

    // 🔹 Asegurar que la galería y el submenú estén ocultos al inicio
    wifiCategories.classList.add("hidden");
    galleryContainer.classList.add("hidden");

    // 🎯 Evento para mostrar/ocultar el submenú WiFi con animación
    wifiButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Clic en WiFi detectado");

        if (wifiCategories.classList.contains("hidden")) {
            showSubmenu();
        } else {
            hideSubmenu();
        }

        // Ocultar la galería cuando se abre el submenú WiFi
        hideGallery();
    });

    // 🎯 Evento para cerrar el submenú si se hace clic fuera de él
    document.addEventListener("click", function (event) {
        setTimeout(() => {
            const isClickInsideSubmenu = wifiCategories.contains(event.target);
            const isClickInsideButton = event.target.closest(".category-btn") !== null;
            const isClickInsideGallery = galleryContainer.contains(event.target);
            const isClickOnWifiButton = wifiButton.contains(event.target);

            if (!isClickInsideSubmenu && !isClickInsideButton && !isClickInsideGallery && !isClickOnWifiButton) {
                console.log("📌 Clic fuera del HUD Submenu y Galería, ocultándolos...");
                hideSubmenu();
                hideGallery();
            }
        }, 100);
    });

    // 🔹 Función para mostrar la galería con animación
    function showGallery(category) {
        console.log(`✅ Clic detectado en: ${category}`);

        // Limpiar la galería antes de agregar nuevas imágenes
        gallery.innerHTML = "";

        if (!galleryData[category]) {
            console.error("❌ Categoría no encontrada:", category);
            return;
        }

        // Crear elementos de la galería
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

        // Mostrar con transición
        galleryContainer.classList.remove("hidden");
        galleryContainer.classList.add("show");
    }

    // 🔹 Función para ocultar la galería con animación
    function hideGallery() {
        galleryContainer.classList.remove("show");
        setTimeout(() => {
            galleryContainer.classList.add("hidden");
        }, 500); // ⏳ Espera 500ms para coincidir con la animación en CSS
    }

    // 🎯 Evento para abrir la galería cuando se hace clic en un botón del submenú
    categoryButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita el cierre inmediato
            const category = this.getAttribute("data-category");
            showGallery(category);
        });
    });

    // 🎯 Evento para cerrar la galería si se hace clic fuera de ella
    document.addEventListener("click", function (event) {
        if (!galleryContainer.contains(event.target) && !event.target.classList.contains("category-btn")) {
            console.log("📌 Clic fuera de la galería, ocultándola...");
            hideGallery();
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
        { title: "Escanear Redes", img: "/assets/images/Network-scan.png" },
        { title: "Conectar a WiFi", img: "assets/images/connect-wifi.png" },
        { title: "Gestión de Redes", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" },
        { title: "Cambiar MAC", img: "https://assets.codepen.io/2585/pothos.jpeg" },
        { title: "Bloquear Dispositivo", img: "https://assets.codepen.io/2585/rubber-tree.webp" },
        { title: "Crear Hotspot", img: "https://assets.codepen.io/2585/fiddle-leaf.jpeg" }
    ],
    recon: [
        { title: "Monitorear Tráfico", img: "https://assets.codepen.io/2585/pink-princess.jpeg" },
        { title: "Escanear Dispositivos", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" },
        { title: "Probar Seguridad WiFi", img: "https://assets.codepen.io/2585/pothos.jpeg" },
        { title: "Detectar Vulnerabilidad", img: "https://assets.codepen.io/2585/rubber-tree.webp" },
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
