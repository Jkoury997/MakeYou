//Require
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session")
const connectDB = require("./database/db")
require('dotenv').config();


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


async function startServer() {
  await connectDB(); // Asegurarte de que la DB esté conectada antes de iniciar el servidor
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}

startServer();