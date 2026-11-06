document.addEventListener("DOMContentLoaded", () => {
    const figuras = document.querySelectorAll(
        ".catalogo-figuras .figura"
    );

    const NUMERO_WHATSAPP = "5491134595539";
    const CLAVE_CARRITO = "carritoCreadores";

    let carrito = JSON.parse(
        localStorage.getItem(CLAVE_CARRITO) || "[]"
    );

    let productoActual = null;

    // =================================
    // FICHA DEL PRODUCTO
    // =================================

    const visor = document.createElement("div");
    visor.className = "visor-foto";

    visor.innerHTML = `
        <div class="ficha-producto">
            <button class="cerrar-visor" type="button">&times;</button>

            <img class="ficha-imagen" src="" alt="">

            <div class="ficha-info">
                <h2 class="ficha-nombre"></h2>
                <p class="ficha-codigo"></p>

                <p><strong>Descripción:</strong>
                    <span class="ficha-descripcion">A completar</span>
                </p>

                <p><strong>Medidas:</strong>
                    <span class="ficha-medidas">A completar</span>
                </p>

                <p><strong>Materiales:</strong>
                    <span class="ficha-materiales">A completar</span>
                </p>

                <p><strong>Iluminación:</strong>
                    <span class="ficha-luces">A completar</span>
                </p>

                <div class="cantidad-producto">
                    <label for="cantidad-ficha">Cantidad:</label>
                    <input id="cantidad-ficha" type="number"
                        min="1" step="1" value="1">
                </div>

                <button class="consultar-precio" type="button">
                    Consultar precio por WhatsApp
                </button>

                <button class="agregar-carrito" type="button">
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(visor);

    const imagenFicha = visor.querySelector(".ficha-imagen");
    const nombreFicha = visor.querySelector(".ficha-nombre");
    const codigoFicha = visor.querySelector(".ficha-codigo");
    const cantidadFicha = visor.querySelector("#cantidad-ficha");
    const materialesFicha = visor.querySelector(".ficha-materiales");
    const lucesFicha = visor.querySelector(".ficha-luces");
    const descripcionFicha = visor.querySelector(".ficha-descripcion");
    const medidasFicha = visor.querySelector(".ficha-medidas");

    // Materiales generales
    const MATERIAL_GENERAL =
        'Planchuela de hierro de 1/2" x 1/8", soldada y pintada.';

    const MATERIAL_ESFERA =
        'Estructura de hierro tubular de 15 x 15 x 1.6 mm, reforzada en el medio con planchuela de 1/2" x 1/8", soldada y pintada.';

    const TELA_LAME =
        "Tela lamé bouclé tratada para resistir el agua.";

    // Información de cada figura según su archivo de imagen
    const datosFiguras = {

        "campana1.jpg": {
            descripcion: "Campana tridimensional decorativa de uso exterior. Ideal para parques, plazas y espacios comerciales. Adaptable a postes de luz.",
            medidas: "Con marco: 1,10 × 1,14 m. / Sin marco: 0,70 × 0,98 m.",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera de hilo incandescente."
        },

       "esfera_azul.jpg": {
            descripcion: "Esfera decorativa para exterior, ideal para parques, plazas y espacios comerciales.",
            medidas: "3,00 × 3,00 m",
            materiales: MATERIAL_ESFERA + " Forrada completamente con " + TELA_LAME,
            luces: "Guirnalda impermeable y manguera de hilo incandescente."
        },

        "trienoplanogrande.jpg": {
            descripcion: "Trineo plano de gran tamaño, apto para uso interior y exterior.",
            medidas: "1,65 × 0,82 m",
            materiales: MATERIAL_GENERAL,
            luces: "Luz de neón."
        },

       "paquete2.jpg": {
            descripcion: "Paquete tridimensional decorativo de gran tamaño. Ideal para parques, plazas y espacios comerciales. Adaptable a postes de luz. Apto para uso exterior.",
            medidas: "Con marco: 0,96 × 1,03 m. / Sin marco: 0,53 × 0,53 × 0,98 m.",
            materiales: MATERIAL_GENERAL + " Lleva tela lamé bouclé en la franja que simula la cinta del paquete.",
            luces: "Manguera de hilo incandescente."
        },
        "trineo_mediano.jpg": {
            descripcion: "Trineo reforzado, con capacidad para soportar aproximadamente 80 kg. Ideal para uso interior y exterior, y para que niños y adultos disfruten de una foto navideña.",
            medidas: "Trineo: 1,40 × 0,90 × 0,60 m / Renos: 1,00 × 1,03 m cada uno",
            materiales: MATERIAL_GENERAL + " Lleva tela lamé bouclé en los laterales.",
            luces: "Luz de neón."
        },

        "pasacalle_moño.jpg": {
            descripcion: "Pasacalle decorativo para uso exterior, ideal para calles, avenidas, plazas y espacios comerciales.",
            medidas: "3,55 × 0,97 m",
            materiales: MATERIAL_GENERAL,
            luces: "Guirnalda impermeable y manguera de hilo incandescente."
        },

        "estrella.jpg": {
            descripcion: "Estrella facetada decorativa, apta para uso interior y exterior.",
            medidas: "0,70 × 0,74 m",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera de hilo incandescente."
        },
        

        "fugazmulti.jpg": {
            descripcion: "Figura decorativa de uso interior y exterior.",
            medidas: "1,00 m",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera de hilo incandescente."
        },

        "paloma1.jpg": {
            descripcion: "Figura decorativa de uso interior y exterior.",
            medidas: "0,60 × 0,60 m",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera Lde hilo incandescente."
        },

        "campanacondoblemuerdago.jpg": {
            descripcion: "Campana decorativa de uso interior y exterior.",
            medidas: "0,65 × 0,85 m",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera de hilo incandescente."
        },

        "campanamuerdagosimple.jpg": {
            descripcion: "Campana decorativa de uso interior y exterior.",
            medidas: "0,75 × 0,76 m",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera de hilo incandescente."
        },

       "reno.jpg": {
            descripcion: "Reno decorativo de uso interior y exterior.",
            medidas: "1,00 × 1,03 m",
            materiales: MATERIAL_GENERAL,
            luces: "Manguera de hilo incandescente."
        },
    };
    
    // =================================
    // ABRIR FICHA
    // =================================

    figuras.forEach((figura) => {
        const imagen = figura.querySelector("img");
        const nombre = figura.querySelector("h2");

        if (!imagen || !nombre) return;

        imagen.addEventListener("click", () => {
            productoActual = {
                codigo: figura.dataset.codigo || "Pendiente",
                nombre: nombre.textContent.trim()
            };

            imagenFicha.src = imagen.src;
            imagenFicha.alt = imagen.alt;
            nombreFicha.textContent = productoActual.nombre;
           codigoFicha.textContent =
         "Código: " + productoActual.codigo;

          // Descripción, materiales e iluminación según la imagen
            const archivoImagen = imagen.getAttribute("src").split("/").pop();
            const datos = datosFiguras[archivoImagen];

            descripcionFicha.textContent =
                datos?.descripcion || "Figura decorativa de uso interior y exterior.";

            medidasFicha.textContent =
              datos?.medidas || "Consultar medidas.";  

            materialesFicha.textContent =
                datos?.materiales || MATERIAL_GENERAL;

            lucesFicha.textContent =
                datos?.luces || "Manguera de hilo incandescente.";

            cantidadFicha.value = 1;

            visor.classList.add("activo");
            document.body.style.overflow = "hidden";
        });
    });

    function cerrarFicha() {
        visor.classList.remove("activo");
        document.body.style.overflow = "";
    }

    visor.querySelector(".cerrar-visor")
        .addEventListener("click", cerrarFicha);

    visor.addEventListener("click", (evento) => {
        if (evento.target === visor) cerrarFicha();
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrarFicha();
            cerrarCarrito();
        }
    });

    function obtenerCantidad() {
        return Math.max(1, parseInt(cantidadFicha.value, 10) || 1);
    }

    function abrirWhatsApp(mensaje) {
        const url =
            "https://wa.me/" + NUMERO_WHATSAPP +
            "?text=" + encodeURIComponent(mensaje);

        window.open(url, "_blank");
    }

    // =================================
    // CONSULTAR PRECIO
    // =================================

    visor.querySelector(".consultar-precio")
        .addEventListener("click", () => {
            if (!productoActual) return;

            const cantidad = obtenerCantidad();

            const mensaje =
                "Hola! Quisiera consultar el precio de esta figura:\n\n" +
                "Código: " + productoActual.codigo + "\n" +
                "Producto: " + productoActual.nombre + "\n" +
                "Cantidad: " + cantidad;

            abrirWhatsApp(mensaje);
        });

    // =================================
    // AGREGAR AL CARRITO
    // =================================

    visor.querySelector(".agregar-carrito")
        .addEventListener("click", () => {
            if (!productoActual) return;

            const cantidad = obtenerCantidad();

            const existente = carrito.find(
                (item) => item.codigo === productoActual.codigo
            );

            if (existente) {
                existente.cantidad += cantidad;
            } else {
                carrito.push({
                    codigo: productoActual.codigo,
                    nombre: productoActual.nombre,
                    cantidad: cantidad
                });
            }

            guardarCarrito();
            actualizarCarrito();

            alert("¡Figura agregada al carrito!");
            cerrarFicha();
        });

    // =================================
    // BOTÓN FLOTANTE DEL CARRITO
    // =================================

    const botonCarrito = document.createElement("button");
    botonCarrito.className = "boton-carrito";
    botonCarrito.type = "button";
    botonCarrito.innerHTML = "🛒 Carrito (<span>0</span>)";

    const tarjetasCategorias = document.querySelector(
    ".tarjetas-productos"
);

if (tarjetasCategorias) {
    tarjetasCategorias.insertAdjacentElement(
        "afterend",
        botonCarrito
    );
} else {
    document.body.appendChild(botonCarrito);
}

    // =================================
    // PANEL DEL CARRITO
    // =================================

    const panelCarrito = document.createElement("div");
    panelCarrito.className = "panel-carrito";

    panelCarrito.innerHTML = `
        <div class="contenido-carrito">
            <button class="cerrar-carrito" type="button">&times;</button>
            <h2>Mi carrito</h2>
            <div class="lista-carrito"></div>
            <button class="vaciar-carrito" type="button">
                Vaciar carrito
            </button>
            <button class="enviar-pedido" type="button">
                Enviar pedido por WhatsApp
            </button>
        </div>
    `;

    document.body.appendChild(panelCarrito);

    function guardarCarrito() {
        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify(carrito)
        );
    }

    function actualizarCarrito() {
        const total = carrito.reduce(
            (suma, item) => suma + item.cantidad,
            0
        );

        botonCarrito.querySelector("span").textContent = total;

        const lista = panelCarrito.querySelector(".lista-carrito");
        lista.innerHTML = "";

        if (carrito.length === 0) {
            lista.textContent = "Todavía no agregaste figuras.";
            return;
        }

        carrito.forEach((item, indice) => {
            const producto = document.createElement("div");
            producto.className = "item-carrito";

            const detalle = document.createElement("p");
            detalle.textContent =
                item.nombre + " | Código: " + item.codigo +
                " | Cantidad: " + item.cantidad;

            const eliminar = document.createElement("button");
            eliminar.type = "button";
            eliminar.textContent = "Quitar";

            eliminar.addEventListener("click", () => {
                carrito.splice(indice, 1);
                guardarCarrito();
                actualizarCarrito();
            });

            producto.append(detalle, eliminar);
            lista.appendChild(producto);
        });
    }

    function abrirCarrito() {
        panelCarrito.classList.add("activo");
    }

    function cerrarCarrito() {
        panelCarrito.classList.remove("activo");
    }

    botonCarrito.addEventListener("click", abrirCarrito);

    panelCarrito.querySelector(".cerrar-carrito")
        .addEventListener("click", cerrarCarrito);

    panelCarrito.querySelector(".vaciar-carrito")
        .addEventListener("click", () => {
            if (!carrito.length) return;

            if (confirm("¿Querés vaciar el carrito?")) {
                carrito = [];
                guardarCarrito();
                actualizarCarrito();
            }
        });

    // =================================
    // ENVIAR PEDIDO COMPLETO
    // =================================

    panelCarrito.querySelector(".enviar-pedido")
        .addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }

            let mensaje = "¡Hola! Quisiera realizar este pedido:\n\n";

            carrito.forEach((item) => {
                mensaje +=
                    "Código: " + item.codigo + "\n" +
                    "Producto: " + item.nombre + "\n" +
                    "Cantidad: " + item.cantidad + "\n\n";
            });

            mensaje += "¡Muchas gracias!";

            abrirWhatsApp(mensaje);
        });

    actualizarCarrito();
});