# Proyecto: Juego 3 en Raya + Agenda Web

## Descripción

Este proyecto contiene dos aplicaciones web desarrolladas con JavaScript:

- **Juego 3 en Raya**: Permite a dos jugadores turnarse para colocar "X" y "O" en un tablero hasta que haya un ganador o empate.
- **Agenda Web**: Permite registrar y gestionar eventos con fecha, hora, título y descripción.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- jQuery
- Node.js (para la agenda)
- Express (para la agenda)

---

## Funcionalidades - Agenda

# CRUD de Eventos

Aplicación web desarrollada con Node.js y Express que permite gestionar eventos personales mediante un sistema basado en archivos. Incluye funcionalidades completas de creación, visualización, edición y eliminación de eventos (CRUD).

---

## Descripción

Este proyecto consiste en una agenda web donde los eventos se almacenan de forma estructurada en el sistema de archivos. Cada evento se guarda en una carpeta correspondiente a una fecha específica y como archivo ".txt" identificado por la hora.

El sistema permite visualizar los eventos en formato de árbol, facilitando la navegación por fechas.

---

## Funcionalidades

- Crear eventos con fecha, hora, título y descripción
- Visualizar eventos organizados por fecha
- Editar eventos existentes
- Eliminar eventos
- Interfaz amigable con HTML, CSS y JavaScript
- Uso de íconos con Font Awesome

---

## Estructura del Proyecto 
AgendaBackend/
│
├── public/
│ ├── index.html # Interfaz principal
│ ├── css/
│ │ └── styles.css # Estilos
│ └── js/
│ └── app.js # Lógica frontend
│
├── routes/
│ └── eventos.js # Rutas del backend
│
├── data/ # Almacenamiento de eventos
│ └── YYYY-MM-DD/
│ └── HH-MM.txt
│
├── index.js # Servidor principal
├── package.json

---

---

## Tecnologías Utilizadas

- Node.js
- Express
- JavaScript (Frontend)
- HTML5
- CSS3
- Font Awesome

---

## Funcionalidades - Juego 3 en Raya

### Manipulación del DOM

La aplicación modifica dinámicamente el DOM en respuesta a las acciones del usuario.

Cuando el usuario hace clic en una celda:
- Se actualiza el contenido del elemento HTML mostrando "X" u "O".
- Se cambian estilos como el color del texto.
- Se actualiza el estado visual del juego (turno, ganador o empate).

### Interacción con el tablero
- Cada celda del tablero es clickeable.
- Se coloca automáticamente "X" o "O" según el turno.

### Control de turnos
- El juego inicia con el turno de "X".
- Los turnos se alternan automáticamente.

### Validación de ganador
Se verifican las siguientes combinaciones:
- Horizontales
- Verticales
- Diagonales

### Detección de empate
- Si todas las celdas están llenas y no hay ganador.

### Reinicio del juego
- Botón para reiniciar el tablero y comenzar de nuevo.

---

## Lógica principal (app.js)

### Variables principales
let turno = "X";
let juegoActivo = true;
let estadoTablero = ["", "", "", "", "", "", "", "", ""];

---

