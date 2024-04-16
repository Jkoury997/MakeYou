const mongoose = require('mongoose');

const heartbeatSchema = new mongoose.Schema({
    sn: String, // Número de serie del dispositivo
    timeStamp: Date, // Fecha y hora del evento
    receivingPower: Number, // Potencia de recepción
    transmissionPower: Number, // Potencia de transmisión
    codeStatus: String, // Estado del código
    version: String, // Versión del firmware
    model: String, // Modelo del dispositivo
    idStore: { type: String, default: '' }
  }, {
    timestamps: true, // Añade automáticamente campos createdAt y updatedAt
    versionKey: false // Desactiva el campo __v
  });

  const Heartbeat = mongoose.model('Heartbeat', heartbeatSchema);

  module.exports = Heartbeat