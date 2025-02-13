document.addEventListener("DOMContentLoaded", function () {
    console.log("Inicializando sistema...");

    const elements = {
        wifiButton: document.getElementById("wifi"),
        wifiCategories: document.getElementById("wifiCategories"),
        categoryButtons: document.querySelectorAll(".category-btn"),
        galleryContainer: document.getElementById("gallery-container"),
        gallery: document.getElementById("gallery"),
        stealthButton: document.getElementById("stealth"),
        usernameField: document.getElementById("username"),
        passwordField: document.getElementById("password"),
        loginForm: document.querySelector(".login-form"),
        loginPage: document.getElementById("loginPage"),
        mainUI: document.getElementById("mainUI"),
        darkModeToggle: document.getElementById("darkModeToggle"),
        bluetoothButton: document.getElementById("bluetooth"),
        bluetoothCategories: document.getElementById("bluetoothCategories")
    };

    let state = {
        darkMode: false,
        stealthMode: false,
        clickCount: 0,
        clickTimer: null,
        inactivityTimer: null,
        galleryRecentlyOpened: false,
        actualPassword: ""
    };

    const symbols = "^][{+>?/=$@&~!-*#_%(})<(";

    function maskPassword(event) {
        if (event.inputType === "deleteContentBackward") {
            state.actualPassword = state.actualPassword.slice(0, -1);
        } else {
            let newInput = event.data;
            if (!newInput) return;

            state.actualPassword += newInput;
            let maskedPassword = state.actualPassword.split("").map(() => {
                return symbols[Math.floor(Math.random() * symbols.length)];
            }).join("");

            elements.passwordField.value = maskedPassword;
            setTimeout(() => {
                elements.passwordField.setSelectionRange(maskedPassword.length, maskedPassword.length);
            }, 0);
        }
    }

    function preventPaste(event) {
        event.preventDefault();
    }

    function validateLogin(event) {
        event.preventDefault();
        let username = elements.usernameField.value.trim();
        if (username === "admin" && state.actualPassword === "admin1991") {
            elements.loginPage.style.display = "none";
            elements.mainUI.style.display = "block";
        } else {
            console.log("❌ Usuario o contraseña incorrectos");
        }
    }

    function showSubmenu() {
        elements.wifiCategories.classList.remove("hidden");
        setTimeout(() => {
            elements.wifiCategories.classList.add("show");
        }, 10);
    }

    function hideSubmenu() {
        elements.wifiCategories.classList.remove("show");
        setTimeout(() => {
            elements.wifiCategories.classList.add("hidden");
        }, 500);
    }

    function showGallery(category) {
        elements.gallery.innerHTML = "";
        if (!galleryData[category]) return;

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

        elements.gallery.appendChild(fieldset);
        elements.galleryContainer.classList.remove("hidden");
        elements.galleryContainer.classList.add("show");
    }

    function hideGallery() {
        elements.galleryContainer.classList.remove("show");
        setTimeout(() => {
            elements.galleryContainer.classList.add("hidden");
        }, 500);
    }

    function toggleBluetoothMenu(event) {
        event.preventDefault();
        if (elements.bluetoothCategories.classList.contains("hidden")) {
            elements.bluetoothCategories.classList.remove("hidden", "fade-out");
            elements.bluetoothCategories.classList.add("show");
        } else {
            elements.bluetoothCategories.classList.remove("show");
            elements.bluetoothCategories.classList.add("fade-out");
            setTimeout(() => {
                elements.bluetoothCategories.classList.add("hidden");
            }, 500);
        }
    }

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

    function toggleStealthMode() {
        state.stealthMode = !state.stealthMode;
        if (state.stealthMode) {
            document.body.classList.add("stealth-active");
            document.querySelectorAll("#menu, #gallery-container, .login-container, #mainUI").forEach(el => {
                el.style.display = "none";
            });
            startClock();
            resetInactivityTimer();
        } else {
            document.body.classList.remove("stealth-active");
            document.querySelectorAll("#menu, #gallery-container, .login-container, #mainUI").forEach(el => {
                el.style.display = "block";
            });
            const clock = document.getElementById("clock");
            if (clock) clock.remove();
            clearTimeout(state.inactivityTimer);
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        state.darkMode = !state.darkMode;
    }

    function detectTripleClick() {
        if (state.stealthMode) {
            state.clickCount++;
            if (!state.clickTimer) {
                state.clickTimer = setTimeout(() => {
                    if (state.clickCount >= 3) {
                        window.location.reload();
                    }
                    state.clickCount = 0;
                    clearTimeout(state.clickTimer);
                    state.clickTimer = null;
                }, 1000);
            }
        }
    }

    function resetInactivityTimer() {
        clearTimeout(state.inactivityTimer);
        state.inactivityTimer = setTimeout(() => {
            window.location.href = "https://www.ebay.com";
        }, 10 * 60 * 1000);
    }

    if (elements.passwordField) {
        elements.passwordField.addEventListener("input", maskPassword);
        elements.passwordField.addEventListener("paste", preventPaste);
    }

    if (elements.loginForm) {
        elements.loginForm.addEventListener("submit", validateLogin);
    }

    elements.wifiButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (elements.wifiCategories.classList.contains("hidden")) {
            showSubmenu();
        } else {
            hideSubmenu();
        }
        hideGallery();
    });

    document.addEventListener("click", function (event) {
        setTimeout(() => {
            const isClickInsideSubmenu = elements.wifiCategories.contains(event.target);
            const isClickInsideButton = event.target.closest(".category-btn") !== null;
            const isClickInsideGallery = elements.galleryContainer.contains(event.target);
            const isClickOnWifiButton = elements.wifiButton.contains(event.target);

            if (!isClickInsideSubmenu && !isClickInsideButton && !isClickInsideGallery && !isClickOnWifiButton) {
                hideSubmenu();
                hideGallery();
            }
        }, 100);
    });

    elements.categoryButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            const category = this.getAttribute("data-category");
            showGallery(category);
        });
    });

    document.addEventListener("click", function (event) {
        if (!elements.galleryContainer.contains(event.target) && !event.target.classList.contains("category-btn")) {
            hideGallery();
        }

        setTimeout(() => {
            const isClickInsideSubmenu = elements.bluetoothCategories.contains(event.target);
            const isClickInsideButton = event.target.closest(".category-btn") !== null;
            const isClickOnBluetoothButton = elements.bluetoothButton.contains(event.target);

            if (!isClickInsideSubmenu && !isClickInsideButton && !isClickOnBluetoothButton) {
                elements.bluetoothCategories.classList.remove("show");
                elements.bluetoothCategories.classList.add("hidden");
            }
        }, 100);
    });

    elements.bluetoothButton.addEventListener("click", toggleBluetoothMenu);

    elements.stealthButton.addEventListener("click", toggleStealthMode);

    if (elements.darkModeToggle) {
        elements.darkModeToggle.addEventListener("change", toggleDarkMode);
    }

    document.addEventListener("click", detectTripleClick);

    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);
});

const galleryData = {
    diplomacy: [
        { title: "Escanear Redes", img: "assets/images/Radar.png" },
        { title: "Conectar a WiFi", img: "assets/images/connect-wifi.png" },
        { title: "Gestión de Redes", img: "assets/images/Iconos/Network_management.png" },
        { title: "Cambiar MAC", img: "assets/images/Iconos/MAc_Swap.png" },
        { title: "Bloquear Dispositivo", img: "assets/images/Iconos/Device_locked.png" },
        { title: "Crear Hotspot", img: "assets/images/Iconos/Crear_HOTSPOT.png" }
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
