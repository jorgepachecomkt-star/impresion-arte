document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       MENÚ MÓVIL
    ============================== */

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        });
    }


    /* ==============================
       GALERÍA AUTOMÁTICA
    ============================== */

    const gallery = document.querySelector(".gallery-grid");

    if (gallery) {

        fetch("./imagenes.json")
            .then(response => {

                if (!response.ok) {
                    throw new Error("No se pudo cargar imagenes.json");
                }

                return response.json();

            })
            .then(imagenes => {

                gallery.innerHTML = "";

                imagenes.forEach((nombre, indice) => {

                    const item = document.createElement("div");

                    item.className = "gallery-item reveal active";
                    item.setAttribute("data-label", "🔍 VER DISEÑO");

                    const img = document.createElement("img");

                    img.src =
                        "./images/" + encodeURIComponent(nombre);

                    img.alt =
                        "Trabajo personalizado Impresion-Arte " +
                        (indice + 1);

                    img.loading = "lazy";

                    item.appendChild(img);


                    /* Botón WhatsApp */

                    const whatsapp = document.createElement("a");

                    whatsapp.className = "gallery-whatsapp";

                    whatsapp.href =
                        "https://wa.me/525655454320?text=" +
                        encodeURIComponent(
                            "Hola Impresion-Arte 👋\n\n" +
                            "Me interesa este trabajo de su galería:\n" +
                            nombre
                        );

                    whatsapp.target = "_blank";
                    whatsapp.rel = "noopener noreferrer";

                    whatsapp.textContent =
                        "💬 Cotizar";

                    whatsapp.addEventListener("click", event => {
                        event.stopPropagation();
                    });

                    item.appendChild(whatsapp);


                    /* Abrir imagen grande */

                    item.addEventListener("click", () => {

                        abrirImagen(
                            img.src,
                            img.alt
                        );

                    });

                    gallery.appendChild(item);

                });

            })
            .catch(error => {

                console.error(error);

                gallery.innerHTML = `
                    <p style="
                        grid-column: 1 / -1;
                        text-align: center;
                        padding: 40px;
                        color: white;
                    ">
                        No se pudieron cargar las fotografías.
                    </p>
                `;

            });

    }


    /* ==============================
       VISOR DE IMÁGENES
    ============================== */

    function abrirImagen(src, alt) {

        const overlay =
            document.createElement("div");

        overlay.className =
            "image-lightbox";


        const container =
            document.createElement("div");

        container.className =
            "lightbox-container";


        const closeButton =
            document.createElement("button");

        closeButton.className =
            "lightbox-close";

        closeButton.textContent =
            "✕";
const previousButton = document.createElement("button");

previousButton.className = "lightbox-prev";
previousButton.textContent = "‹";

const nextButton = document.createElement("button");

nextButton.className = "lightbox-next";
nextButton.textContent = "›";

        const image =
            document.createElement("img");

        image.src = src;
        image.alt = alt;


        const caption =
            document.createElement("div");

        caption.className =
            "lightbox-caption";

        caption.textContent =
            alt;


container.appendChild(closeButton);
container.appendChild(previousButton);
container.appendChild(image);
container.appendChild(nextButton);
container.appendChild(caption);

        overlay.appendChild(container);

        document.body.appendChild(overlay);

        document.body.style.overflow =
            "hidden";


        setTimeout(() => {
            overlay.classList.add("show");
        }, 10);


        const cerrar = () => {

            overlay.classList.add("closing");

            setTimeout(() => {

                overlay.remove();

                document.body.style.overflow =
                    "";

            }, 200);

        };


        closeButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                cerrar();

            }
        );


        overlay.addEventListener(
            "click",
            event => {

                if (event.target === overlay) {
                    cerrar();
                }

            }
        );


        document.addEventListener(
            "keydown",
            function cerrarConEscape(event) {

                if (event.key === "Escape") {

                    cerrar();

                    document.removeEventListener(
                        "keydown",
                        cerrarConEscape
                    );

                }

            }
        );

    }
/* ==============================
   CAMBIAR IMAGEN DE LA GALERÍA
============================== */

document.addEventListener("click", event => {

    const botonAnterior = event.target.closest(".lightbox-prev");
    const botonSiguiente = event.target.closest(".lightbox-next");

    if (!botonAnterior && !botonSiguiente) {
        return;
    }

    const imagenActual =
        document.querySelector(".image-lightbox img");

    if (!imagenActual) {
        return;
    }

    const imagenes =
        Array.from(
            document.querySelectorAll(".gallery-item img")
        );

    const indiceActual =
        imagenes.findIndex(img =>
            img.src === imagenActual.src
        );

    if (indiceActual === -1) {
        return;
    }

    let nuevoIndice;

    if (botonSiguiente) {

        nuevoIndice =
            (indiceActual + 1) % imagenes.length;

    } else {

        nuevoIndice =
            (indiceActual - 1 + imagenes.length) %
            imagenes.length;
    }

    imagenActual.src =
        imagenes[nuevoIndice].src;

    imagenActual.alt =
        imagenes[nuevoIndice].alt;

});

    /* ==============================
       FORMULARIO → WHATSAPP
    ============================== */

    const form =
        document.getElementById("contact-form");

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const nombre =
                document.getElementById("nombre")
                    .value
                    .trim();

            const correo =
                document.getElementById("correo")
                    .value
                    .trim();

            const mensaje =
                document.getElementById("mensaje")
                    .value
                    .trim();


            if (!nombre || !correo || !mensaje) {
                return;
            }


            const texto =
`Hola Impresion-Arte 👋

Quiero solicitar una cotización.

👤 Nombre: ${nombre}

📧 Correo: ${correo}

💬 Mi solicitud:
${mensaje}`;


            const url =
                "https://wa.me/525655454320?text=" +
                encodeURIComponent(texto);


            window.open(url, "_blank");

        });

    }

});
