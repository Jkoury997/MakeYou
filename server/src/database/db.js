const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://jkoury:w71b51vDNgs9@149.50.130.51:27017/mkapp', {
      serverSelectionTimeoutMS: 5000 // Mantén esta opción si es necesaria para tu configuración
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err);
    process.exit(1);
  }
}

module.exports = connectDB;

