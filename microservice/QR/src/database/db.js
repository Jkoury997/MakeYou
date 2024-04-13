require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Mantén esta opción si es necesaria para tu configuración
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err);
    process.exit(1);
  }
}

module.exports = connectDB;
