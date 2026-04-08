const express = require("express");
const app = express();
const eventosRoutes = require("./routes/eventos");
const cors = require("cors");


app.use(cors());
app.use(express.json()); // para leer JSON
app.use(express.static("public"));

app.use("/eventos", eventosRoutes);

/* app.get("/", (req, res) => {
    res.send(__dirname + "/public/index.html");
}); */

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});




