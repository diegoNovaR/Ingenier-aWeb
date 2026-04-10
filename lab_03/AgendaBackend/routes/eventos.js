const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Definimos dónde se guardarán los datos
const carpetaBase = path.join(__dirname, "../data");

// Si no existe la carpeta principal 'data', la creamos
if (!fs.existsSync(carpetaBase)) {
    fs.mkdirSync(carpetaBase);
}

/**
 * GET: Obtener todos los eventos en formato árbol
 * Estructura:
 */
router.get("/", (req, res) => {
    const agenda = {};

    const fechas = fs.readdirSync(carpetaBase);

    fechas.forEach(fecha => {
        const rutaFecha = path.join(carpetaBase, fecha);

        if (fs.lstatSync(rutaFecha).isDirectory()) {
            const archivos = fs.readdirSync(rutaFecha);

            agenda[fecha] = archivos.map(archivo => {
                const rutaArchivo = path.join(rutaFecha, archivo);

                let titulo = "Sin título";
                let descripcion = "Sin descripción";

                try {
                    const contenido = fs.readFileSync(rutaArchivo, "utf-8");
                    const lineas = contenido.split("\n");

                    if (lineas[0]) titulo = lineas[0];
                    if (lineas[1]) descripcion = lineas[1];

                } catch (error) {
                    console.error("Error leyendo archivo:", error);
                }

                return {
                    archivo,
                    titulo,
                    descripcion
                };
            });
        }
    });

    res.json(agenda);
});


/**
 * POST: Crear un evento
 */
router.post("/", (req, res) => {
    const { fecha, hora, titulo, descripcion } = req.body;

    if (!fecha || !hora || !titulo) {
        return res.status(400).json({ error: "Faltan datos (fecha, hora o título)" });
    }

    const rutaFecha = path.join(carpetaBase, fecha);
    const nombreArchivo = `${hora.replace(":", "-")}.txt`;
    const rutaArchivo = path.join(rutaFecha, nombreArchivo);

    if (!fs.existsSync(rutaFecha)) {
        fs.mkdirSync(rutaFecha, { recursive: true });
    }

    if (fs.existsSync(rutaArchivo)) {
        return res.status(400).json({ error: "Ya existe un evento a esa hora" });
    }

    const contenido = `${titulo}\n${descripcion || ""}`;
    fs.writeFileSync(rutaArchivo, contenido);

    res.status(201).json({ mensaje: "Evento creado con éxito" });
});


/**
 * DELETE: Eliminar un evento
 */
router.delete("/:fecha/:hora", (req, res) => {
    const { fecha, hora } = req.params;

    const rutaFecha = path.join(carpetaBase, fecha);
    const nombreFinal = hora.endsWith('.txt') ? hora : `${hora}.txt`;
    const rutaArchivo = path.join(rutaFecha, nombreFinal);

    try {
        if (!fs.existsSync(rutaArchivo)) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }

        fs.unlinkSync(rutaArchivo);

        if (fs.existsSync(rutaFecha)) {
            const archivosRestantes = fs.readdirSync(rutaFecha);

            if (archivosRestantes.length === 0) {
                fs.rmdirSync(rutaFecha);
            }
        }

        return res.json({ mensaje: "Evento eliminado correctamente" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar evento" });
    }
});


/**
 * PUT: Editar un evento
 */
router.put("/:fecha/:hora", (req, res) => {
    const { fecha, hora } = req.params;
    const { titulo, descripcion } = req.body;

    const nombreFinal = hora.endsWith('.txt') ? hora : `${hora}.txt`;
    const rutaArchivo = path.join(carpetaBase, fecha, nombreFinal);

    if (!fs.existsSync(rutaArchivo)) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    const contenido = `${titulo}\n${descripcion || ""}`;
    fs.writeFileSync(rutaArchivo, contenido);

    res.json({ mensaje: "Evento actualizado" });
});


module.exports = router;