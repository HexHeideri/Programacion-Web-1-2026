
document.addEventListener("DOMContentLoaded", () => {
    // Evita crear los destellos más de una vez
    if (document.querySelector(".fondo-destellos")) return;

    const fondo = document.createElement("div");
    fondo.className = "fondo-destellos";
    fondo.setAttribute("aria-hidden", "true");

    const cantidad = 75;

    for (let i = 0; i < cantidad; i++) {
        // Creamos cada adorno
        const destello = document.createElement("span");
        destello.className = "destello";

        const tipo = Math.random();

        if (tipo < 0.35) {
            destello.textContent = "✶";
            destello.classList.add("estrella-grande");
        } else if (tipo < 0.55) {
            destello.textContent = "❄";
            destello.classList.add("copo-decorativo");
        } else if (tipo < 0.78) {
            destello.textContent = "•";
            destello.classList.add("punto-decorativo");
        } else {
            destello.textContent = "✧";
            destello.classList.add("brillo-pequeno");
        }

        // Posición aleatoria
        destello.style.left = `${Math.random() * 100}%`;
        destello.style.top = `${Math.random() * 100}%`;

        // Animación suave
        destello.style.animationDelay = `${Math.random() * 4}s`;
        destello.style.animationDuration =
            `${2 + Math.random() * 3}s`;

        // Blanco o dorado
        destello.classList.add(
            Math.random() > 0.5 ? "blanco" : "dorado"
        );

        fondo.appendChild(destello);
    }

    document.body.prepend(fondo);
});
