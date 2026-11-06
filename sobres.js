
document.querySelectorAll(".contenedor-sobres .sobre").forEach((sobre) => {
    sobre.addEventListener("click", (evento) => {
        // En pantallas táctiles y con mouse,
        // mostramos la animación antes de navegar.
        if (sobre.classList.contains("abriendo")) return;

        evento.preventDefault();
        sobre.classList.add("abriendo");

        const destino = sobre.href;

        window.setTimeout(() => {
            window.location.href = destino;
        }, 450);
    });
});
