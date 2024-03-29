//Require
const express = require('express');
const cors = require('cors');
const mainRouter = require("./routes/mainRoutes")
const connectDB = require("./database/db")
const path = require("path")

require('dotenv').config();
const PORT = process.env.PORT || 3000;


// Express()
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api",mainRouter)

async function startServer() {
    await connectDB(); // Asegurarte de que la DB esté conectada antes de iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  }
  
  startServer();