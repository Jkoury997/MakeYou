const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const mongoURI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

// Importamos el módulo TCP después de la declaración de variables de entorno.
const { IRTCP } = require('./IRService/tcp');

function initTcp() {
    new IRTCP({
        port: 8085,
        host: '192.168.0.165'
    });
}


// Conectar a MongoDB y luego iniciar el servidor TCP
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
        initTcp();  // Iniciar el servidor TCP solo después de que la conexión a la DB sea exitosa
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
    });



