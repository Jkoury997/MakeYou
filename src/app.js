//Require
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session")


// Express()
const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(session({
  secret:"MakeYou",
  resave: false,
  saveUninitialized: false
})) 

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

// Sincornizar base de datos
// Sincronizar modelos con base de datos
const db = require('../models/index')
db.sequelize.sync()
  .then(() => {
    console.log('Tablas creadas (si no existían previamente).');
  })
  .catch(error => {
    console.log('Error al sincronizar la base de datos:', error);
  });
