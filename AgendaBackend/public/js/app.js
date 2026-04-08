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
                    divArchivo.innerText = " " + archivo;
                    container.appendChild(divArchivo);
                });
            }
        }

        // Cargar lista al inicio
        window.onload = listarEventos;