const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "../eventos");

// crear carpeta si no existe
if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta);
}


function obtenerEventos() {
    const archivos = fs.readdirSync(carpeta);

    return archivos.map((archivo, index) => {
        const contenido = fs.readFileSync(path.join(carpeta, archivo), "utf-8");
        const lineas = contenido.split("\n");

        return {
            id: index + 1,
            archivo,
            fecha: archivo.split("_")[0],
            hora: archivo.split("_")[1].replace(".txt", ""),
            titulo: lineas[0],
            descripcion: lineas.slice(1).join("\n")
        };
    });
}


router.get("/", (req, res) => {
    const eventos = obtenerEventos();
    res.json(eventos);
});


router.get("/:id", (req, res) => {
    const eventos = obtenerEventos();
    const id = parseInt(req.params.id);

    const evento = eventos.find(e => e.id === id);

    if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json(evento);
});

router.post("/", (req, res) => {
    const { fecha, hora, titulo, descripcion } = req.body;

    if (!fecha || !hora || !titulo) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    const nombre = `${fecha}_${hora}.txt`;
    const ruta = path.join(carpeta, nombre);

    if (fs.existsSync(ruta)) {
        return res.status(400).json({ error: "El evento ya existe" });
    }

    fs.writeFileSync(ruta, titulo + "\n" + (descripcion || ""));

    res.status(201).json({
        mensaje: "Evento creado",
        evento: { fecha, hora, titulo, descripcion }
    });
});


router.put("/:id", (req, res) => {
    const eventos = obtenerEventos();
    const id = parseInt(req.params.id);

    const evento = eventos.find(e => e.id === id);

    if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    const { titulo, descripcion } = req.body;

    fs.writeFileSync(
        path.join(carpeta, evento.archivo),
        (titulo || evento.titulo) + "\n" + (descripcion || evento.descripcion)
    );

    res.json({ mensaje: "Evento actualizado" });
});


router.delete("/:id", (req, res) => {
    const eventos = obtenerEventos();
    const id = parseInt(req.params.id);

    const evento = eventos.find(e => e.id === id);

    if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    fs.unlinkSync(path.join(carpeta, evento.archivo));

    res.json({ mensaje: "Evento eliminado" });
});

module.exports = router;