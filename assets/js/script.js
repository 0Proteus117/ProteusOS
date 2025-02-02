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

    // 🔹 Asegurar que la galería y el submenú estén ocultos al inicio
    wifiCategories.style.display = "none";
    galleryContainer.style.display = "none";

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

    // 🔥 Datos de la galería por categoría
    const galleryData = {
        diplomacy: [
            { title: "Escanear Redes", img: "https://assets.codepen.io/2585/fiddle-leaf.jpeg" },
            { title: "Conectar a WiFi", img: "https://assets.codepen.io/2585/pink-princess.jpeg" },
            { title: "Administrar Redes", img: "https://assets.codepen.io/2585/kara-eads-zcVArTF8Frs-unsplash.jpg" },
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

    // 🎯 Evento para mostrar/ocultar el submenú WiFi
    wifiButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("Clic en WiFi detectado");

        if (wifiCategories.classList.contains("show")) {
            wifiCategories.classList.remove("show");
            setTimeout(() => {
                wifiCategories.style.display = "none";
            }, 300);
        } else {
            wifiCategories.style.display = "flex";
            setTimeout(() => {
                wifiCategories.classList.add("show");
            }, 10);
        }

        // Ocultar la galería cuando se abre el submenú WiFi
        galleryContainer.style.display = "none";
    });

    // 🎯 Evento para mostrar la galería al hacer clic en una opción del submenú
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            console.log(`✅ Clic detectado en: ${category}`);
    
            // Limpiar la galería antes de agregar nuevas imágenes
            gallery.innerHTML = "";
    
            // Verificar si la categoría existe
            if (!galleryData[category]) {
                console.error("❌ Categoría no encontrada:", category);
                return;
            }
    
            // Crear el fieldset para la nueva galería
            const fieldset = document.createElement("fieldset");
    
            galleryData[category].forEach(item => {
                const label = document.createElement("label");
                label.style.backgroundImage = `url(${item.img})`;
    
                // Agregar el efecto de expansión al seleccionar
                label.innerHTML = `<input type="radio" name="images" value="${item.title}">`;
                fieldset.appendChild(label);
            });
    
            // Agregar el fieldset a la galería
            gallery.appendChild(fieldset);
    
            // 🔥 Ajustar la posición y tamaño de la galería
            galleryContainer.style.display = "block";
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
});
