const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const QRCodeSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  nameQr: String,
  typeQr: String,
  name: String,
  lastname: String,
  phone: String,
  email: String,
  website: String,
  nameDireccion: String,
  urlDireccion: String,
  whatsapp: String,
  urlWhatsapp: String,
  business: String,
  puesto: String,
  ssid: String,
  networkType: String,
  password: String,
  hiddenSSID: Boolean
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = QRCode;
