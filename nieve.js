
const capaNieve = document.createElement("div");
capaNieve.classList.add("capa-nieve");
capaNieve.setAttribute("aria-hidden", "true");
document.body.appendChild(capaNieve);

const cantidadCopos = 75;

for (let i = 0; i < cantidadCopos; i++) {
    const copo = document.createElement("span");

    copo.classList.add("copo-nieve");
    copo.textContent = "❄";

    const tamano = Math.random() * 14 + 12;
    const duracion = Math.random() * 7 + 6;
    const posicion = Math.random() * 100;
    const deriva = Math.random() * 120 - 60;
    const retraso = Math.random() * -13;
    const opacidad = Math.random() * 0.5 + 0.4;

    copo.style.left = `${posicion}%`;
    copo.style.fontSize = `${tamano}px`;
    copo.style.opacity = opacidad;
    copo.style.setProperty("--deriva", `${deriva}px`);
    copo.style.animationDuration = `${duracion}s`;
    copo.style.animationDelay = `${retraso}s`;

    capaNieve.appendChild(copo);
}
