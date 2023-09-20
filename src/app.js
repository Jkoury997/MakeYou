//Require
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

// Express()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

//middleweares
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method"));

// Template Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // Define la ubicación de la carpeta de las Vistas

//Routes
const mainRouter = require("./routes/main"); // Rutas main
app.use("/", mainRouter);

//Servidor
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});