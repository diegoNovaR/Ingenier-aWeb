const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Definimos dónde se guardarán los datos (Carpeta 'data' en la raíz)
const carpetaBase = path.join(__dirname, "../data");

// Si no existe la carpeta principal 'data', la creamos
if (!fs.existsSync(carpetaBase)) {
    fs.mkdirSync(carpetaBase);
}

/**
 * GET: Obtener todos los eventos en formato árbol
 * Estructura: { "2023-05-15": ["10-00", "13-30"], ... }
 */
router.get("/", (req, res) => {
    const agenda = {};
    
    // Leemos las carpetas de fechas
    const fechas = fs.readdirSync(carpetaBase);

    fechas.forEach(fecha => {
        const rutaFecha = path.join(carpetaBase, fecha);
        
        // Verificamos si es un directorio
        if (fs.lstatSync(rutaFecha).isDirectory()) {
            const archivos = fs.readdirSync(rutaFecha);
            // Quitamos el .txt para mostrar solo la hora
            agenda[fecha] = archivos.map(archivo => archivo.replace(".txt", ""));
        }
    });

    res.json(agenda);
});

/**
 * POST: Crear un evento
 * Crea una carpeta para la fecha y un archivo para la hora
 */
router.post("/", (req, res) => {
    const { fecha, hora, titulo, descripcion } = req.body;

    if (!fecha || !hora || !titulo) {
        return res.status(400).json({ error: "Faltan datos (fecha, hora o título)" });
    }

    const rutaFecha = path.join(carpetaBase, fecha);
    // Reemplazamos : por - para evitar problemas de nombres en Windows (ej: 10:30 -> 10-30)
    const nombreArchivo = `${hora.replace(":", "-")}.txt`;
    const rutaArchivo = path.join(rutaFecha, nombreArchivo);

    // 1. Crear carpeta de la fecha si no existe
    if (!fs.existsSync(rutaFecha)) {
        fs.mkdirSync(rutaFecha, { recursive: true });
    }

    // 2. Verificar si el evento ya existe
    if (fs.existsSync(rutaArchivo)) {
        return res.status(400).json({ error: "Ya existe un evento a esa hora" });
    }

    // 3. Escribir contenido: Título en la primera línea
    const contenido = `${titulo}\n${descripcion || ""}`;
    fs.writeFileSync(rutaArchivo, contenido);

    res.status(201).json({ mensaje: "Evento creado con éxito" });
});

/**
 * DELETE: Eliminar un evento
 * Recibe fecha y hora por parámetros o body
 */
router.delete("/:fecha/:hora", (req, res) => {
    const { fecha, hora } = req.params;

    const rutaFecha = path.join(carpetaBase, fecha);
    const rutaArchivo = path.join(rutaFecha, `${hora}.txt`);

    try {
        //validar existencia
        if (!fs.existsSync(rutaArchivo)) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }

        //eliminar archivo
        fs.unlinkSync(rutaArchivo);

        //limpiar carpeta si queda vacía
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
 * EDITAR: Editar un evento
 */

router.put("/:fecha/:hora", (req, res) => {
    const { fecha, hora } = req.params;
    const { titulo, descripcion } = req.body;

    const rutaArchivo = path.join(carpetaBase, fecha, `${hora}.txt`);

    if (!fs.existsSync(rutaArchivo)) {
        return res.status(404).json({ error: "Evento no encontrado" });
    }

    const contenido = `${titulo}\n${descripcion || ""}`;
    fs.writeFileSync(rutaArchivo, contenido);

    res.json({ mensaje: "Evento actualizado" });
});


module.exports = router;