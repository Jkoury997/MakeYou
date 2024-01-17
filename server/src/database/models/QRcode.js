const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const QRCodeSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  typeQr: String,
  name: String,
  lastname: String,
  phone: String,
  phoneBusinnes: String, // Añadido para coincidir con la clave 'phoneBusinnes' de los datos
  address: String,
  city: String,
  postCode: String,
  country: String,
  company: String,
  titleJob: String, // Añadido para coincidir con la clave 'titleJob' de los datos
  email: String,
  website: String,
  color: String, // Añadido para coincidir con la clave 'color' de los datos
  logo: String, // Añadido para coincidir con la clave 'logo' de los datos
  whatsapplink: String,
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = QRCode;

