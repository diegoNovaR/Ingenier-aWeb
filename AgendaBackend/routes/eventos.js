const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "../eventos");

// crear carpeta si no existe
if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta);
}

function nombreArchivo(fecha, hora) {
    return `${fecha}_${hora}.txt`;
}

function rutaArchivo(nombre) {
    return path.join(carpeta, nombre);
}

// 📌 CREAR EVENTO
router.post("/", (req, res) => {
    const { fecha, hora, titulo, descripcion } = req.body;

    const nombre = nombreArchivo(fecha, hora);
    const ruta = rutaArchivo(nombre);

    if (fs.existsSync(ruta)) {
        return res.status(400).send("El evento ya existe");
    }

    const contenido = titulo + "\n" + descripcion;
    fs.writeFileSync(ruta, contenido);

    res.send("Evento creado");
});

// 📌 VER EVENTOS (árbol)
router.get("/", (req, res) => {
    const archivos = fs.readdirSync(carpeta);

    let arbol = "📁 eventos\n";

    archivos.forEach((archivo) => {
        const contenido = fs.readFileSync(rutaArchivo(archivo), "utf-8");
        const titulo = contenido.split("\n")[0];

        arbol += ` ├── ${titulo}\n`;
    });

    res.send(arbol);
});

// 📌 EDITAR
router.put("/", (req, res) => {
    const { fecha, hora, titulo, descripcion } = req.body;

    const ruta = rutaArchivo(nombreArchivo(fecha, hora));

    if (!fs.existsSync(ruta)) {
        return res.status(404).send("No existe");
    }

    fs.writeFileSync(ruta, titulo + "\n" + descripcion);

    res.send("Actualizado");
});

// 📌 ELIMINAR
router.delete("/", (req, res) => {
    const { fecha, hora } = req.body;

    const ruta = rutaArchivo(nombreArchivo(fecha, hora));

    if (!fs.existsSync(ruta)) {
        return res.status(404).send("No existe");
    }

    fs.unlinkSync(ruta);

    res.send("Eliminado");
});

module.exports = router;