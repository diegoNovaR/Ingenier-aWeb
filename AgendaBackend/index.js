const express = require("express");
const app = express();

app.use(express.json()); // para leer JSON

app.get("/", (req, res) => {
    res.send("API Agenda funcionando");
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});

const eventosRoutes = require("./routes/eventos");

app.use("/eventos", eventosRoutes);