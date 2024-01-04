//Require
const express = require("express");
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3003;


// Express()
const app = express();

app.use(cors());


app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api",mainRouter)

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));