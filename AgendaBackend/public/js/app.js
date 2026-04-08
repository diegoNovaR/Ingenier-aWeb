// Función para guardar el evento enviando datos al backend
        async function guardarEvento() {
            const data = {
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                titulo: document.getElementById('titulo').value,
                descripcion: document.getElementById('descripcion').value
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

        // Función para obtener y mostrar los eventos en formato árbol
        async function listarEventos() {
            const res = await fetch('http://localhost:3000/eventos');
            const data = await res.json();
            const container = document.getElementById('arbol-eventos');
            container.innerHTML = '';

            for (const fecha in data) {
                const divFecha = document.createElement('div');
                divFecha.className = 'date-folder';
                divFecha.innerText = " " + fecha;
                container.appendChild(divFecha);

                data[fecha].forEach(archivo => {
        const divArchivo = document.createElement('div');
        divArchivo.className = 'event-file';

        //texto del evento
        const texto = document.createElement("span");
        texto.innerText = " " + archivo;

        // ELIMINAR
        const btnEliminar = document.createElement("span");
        btnEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        btnEliminar.style.cursor = "pointer";
        btnEliminar.style.marginLeft = "10px";

        btnEliminar.onclick = async () => {
        const ok = confirm("¿Seguro que deseas eliminar este evento?");
        if (!ok) return;

        await fetch(`http://localhost:3000/eventos/${fecha}/${archivo}`, {
            method: "DELETE"
        });

        listarEventos();
    };

    // EDITAR
    const btnEditar = document.createElement("span");
    btnEditar.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    btnEditar.style.cursor = "pointer";
    btnEditar.style.marginLeft = "10px";

    btnEditar.onclick = async () => {
        const nuevoTitulo = prompt("Nuevo título:");
        const nuevaDescripcion = prompt("Nueva descripción:");

        if (!nuevoTitulo) return;

        await fetch(`http://localhost:3000/eventos/${fecha}/${archivo}`, {
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

    //ensamblar elemento
    divArchivo.appendChild(texto);
    divArchivo.appendChild(btnEditar);
    divArchivo.appendChild(btnEliminar);

    container.appendChild(divArchivo);});
            }
        }

        // Cargar lista al inicio
        window.onload = listarEventos;