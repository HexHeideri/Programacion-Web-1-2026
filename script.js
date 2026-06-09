<script>

document.addEventListener("DOMContentLoaded", () => {

    const botonTema = document.getElementById("toggle-theme");
    const iconoTema = document.getElementById("theme-icon");
    const raizHtml = document.documentElement;

    botonTema.addEventListener("click", () => {
        const temaActual = raizHtml.getAttribute("data-theme");

        if (temaActual === "dark") {
            raizHtml.setAttribute("data-theme", "light");
            iconoTema.textContent = "🌞";
        } else {
            raizHtml.setAttribute("data-theme", "dark");
            iconoTema.textContent = "🌙";
        }
    });

function CalcularCompra() {

    let sahumerios = parseInt(document.getElementById("sahumerios").value) || 0;
    let aromatizantes = parseInt(document.getElementById("aromatizantes").value) || 0;
    let velas = parseInt(document.getElementById("velas").value) || 0;
    let defumadores = parseInt(document.getElementById("defumadores").value) || 0;
    let difusores = parseInt(document.getElementById("difusores").value) || 0;
    
let cantidadTotal =
    sahumerios +
    aromatizantes +
    defumadores +
    difusores +
    velas;

    let neto =
        (sahumerios * 1000) +
        (aromatizantes * 2000) +
        (velas * 3500) +
        (defumadores * 2500)+
        (difusores * 3000);

    let porcentaje = 0;

    if (cantidadTotal > 20) {
        porcentaje = 30;
    } else if (cantidadTotal > 10) {
        porcentaje = 15;
    } else if (cantidadTotal > 5) {
        porcentaje = 5;
    }

    let descuento = neto * porcentaje / 100;
    let total = neto - descuento;

    document.getElementById("cantidad").textContent = cantidadTotal;
    document.getElementById("neto").textContent = neto;
    document.getElementById("descuento").textContent = descuento;
    document.getElementById("total").textContent = total;
}
</script>
