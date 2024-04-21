const express = require('express');
const connectDB = require("./database/db")
const mainRoute = require("./routes/mainRoute")
const morgan  = require('morgan') 
const cors = require('cors');

require('dotenv').config();

const app = express();
// Uso de CORS para permitir todos los dominios
app.use(cors());

app.use(express.json());

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}));

app.use('/api', mainRoute); 


async function startServer() {
  await connectDB(); // Asegurarte de que la DB esté conectada antes de iniciar el servidor
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}

startServer();