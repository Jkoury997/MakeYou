// En ./database/models/Store.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const storeSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4 },
  idStore: { type: String, required: true }, // Asegurándonos de que el campo idStore está incluido.
  name: { type: String, required: true },
  sn: { type: String, required: true }
},{
  timestamps: true, // Añade automáticamente campos createdAt y updatedAt
  versionKey: false // Desactiva el campo __v
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
