// Función para guardar el evento enviando datos al backend
async function guardarEvento() {
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    if (!fecha || !titulo) {
        alert("Fecha y título son obligatorios");
        return;
    }

    const data = {
        fecha,
        hora: hora || "Sin hora",
        titulo,
        descripcion
    };

    const response = await fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Evento guardado!");
        listarEventos();
    } else {
        alert("Error al guardar");
    }
}


// Función para obtener y mostrar los eventos en formato árbol desplegable
async function listarEventos() {
    const res = await fetch('http://localhost:3000/eventos');
    const data = await res.json();

    const container = document.getElementById('arbol-eventos');
    container.innerHTML = '';

    for (const fecha in data) {

        // Contenedor de fecha
        const divFecha = document.createElement('div');
        divFecha.className = 'date-folder';
        divFecha.innerHTML = `<i class="fa-solid fa-calendar"></i> ${fecha}`;

        // Contenedor de eventos (oculto)
        const contEventos = document.createElement('div');
        contEventos.style.display = "none";

        // Click para mostrar u ocultar eventos de la fecha
        divFecha.style.cursor = "pointer";
        divFecha.onclick = () => {
            contEventos.style.display =
                contEventos.style.display === "none" ? "block" : "none";
        };

        container.appendChild(divFecha);
        container.appendChild(contEventos);


        // Eventos dentro de la fecha
        data[fecha].forEach(evento => {

            const divArchivo = document.createElement('div');
            divArchivo.className = 'event-file';

            // Compatibilidad si el backend aún envía solo string
            let nombreArchivo = typeof evento === "string" ? evento : evento.archivo;

            // Hora formateada
            let hora = nombreArchivo.replace(".txt", "").replace("-", ":");

            if (!hora || hora === "") {
                hora = "Sin hora";
            }

            const texto = document.createElement("span");
            texto.innerHTML = `<i class="fa-solid fa-clock"></i> ${hora}`;


            // Contenedor de detalle (titulo y descripcion)
            const detalle = document.createElement("div");
            detalle.style.display = "none";
            detalle.style.marginLeft = "20px";
            detalle.style.marginTop = "5px";

            const titulo = evento.titulo || "Sin título";
            const descripcion = evento.descripcion || "Sin descripción";

            detalle.innerHTML = `
                <div><strong>Título:</strong> ${titulo}</div>
                <div><strong>Descripción:</strong> ${descripcion}</div>
            `;

            // Click para mostrar u ocultar detalle
            texto.style.cursor = "pointer";
            texto.onclick = () => {
                detalle.style.display =
                    detalle.style.display === "none" ? "block" : "none";
            };


            // Eliminar
            const btnEliminar = document.createElement("span");
            btnEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            btnEliminar.style.cursor = "pointer";
            btnEliminar.style.marginLeft = "10px";

            btnEliminar.onclick = async () => {
                const ok = confirm("¿Seguro que deseas eliminar este evento?");
                if (!ok) return;

                await fetch(`http://localhost:3000/eventos/${fecha}/${nombreArchivo}`, {
                    method: "DELETE"
                });

                listarEventos();
            };


            // Editar
            const btnEditar = document.createElement("span");
            btnEditar.innerHTML = `<i class="fa-solid fa-pen"></i>`;
            btnEditar.style.cursor = "pointer";
            btnEditar.style.marginLeft = "10px";

            btnEditar.onclick = async () => {
                const nuevoTitulo = prompt("Nuevo título:");
                const nuevaDescripcion = prompt("Nueva descripción:");

                if (!nuevoTitulo) return;

                await fetch(`http://localhost:3000/eventos/${fecha}/${nombreArchivo}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        titulo: nuevoTitulo,
                        descripcion: nuevaDescripcion
                    })
                });

                listarEventos();
            };


            // Ensamblar elementos
            divArchivo.appendChild(texto);
            divArchivo.appendChild(btnEditar);
            divArchivo.appendChild(btnEliminar);
            divArchivo.appendChild(detalle);

            contEventos.appendChild(divArchivo);
        });
    }
}
function entrarAgenda() {
    document.getElementById("portada").style.display = "none";
    document.getElementById("app").style.display = "block";
}


// Cargar lista al inicio
window.onload = listarEventos;
