require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  const dbUser = encodeURIComponent(process.env.DB_USER);
  const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;

  // Reconstruyendo la URI de MongoDB
  const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err);
    process.exit(1);
  }
}

module.exports = connectDB;
