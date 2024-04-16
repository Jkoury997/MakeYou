const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const svHost = process.env.SERVER_HOST;
const svPort = process.env.SERVER_PORT

const mongoURI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

// Importamos el módulo TCP después de la declaración de variables de entorno.
const { IRTCP } = require('./IRService/tcp');

function initTcp() {
    new IRTCP({
        port: svPort,
        host: svHost
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



