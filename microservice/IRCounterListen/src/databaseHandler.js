// En ../databaseHandler.js
const mongoose = require('mongoose');
const Heartbeat = require('./database/models/Heartbeat'); // Asegúrate de que la ruta es correcta.
const CountData = require('./database/models/CountData'); // Asegúrate de que la ruta es correcta.
const Store = require("./database/models/Store")

async function saveHeartbeatDataBase(heartbeat) {
    console.log(heartbeat)
    try {
        // Busca el Store que coincida con el sn proporcionado en countData
        const store = await Store.findOne({ sn: heartbeat.sn }).exec();
        // Si se encuentra un Store que coincide, usar su idStore, de lo contrario dejar idStore como vacío
        heartbeat.idStore = store ? store.idStore : '';

        // Crear la entrada de Heartbeat con el idStore agregado
        const heartbeatEntry = new Heartbeat(heartbeat);

        await heartbeatEntry.save();
        console.log('Heartbeat data saved successfully');
    } catch (err) {
        console.error('Error saving heartbeat data:', err);
    }
}

async function saveCountDataBase(countData) {
    console.log(countData)
    try {
        // Busca el Store que coincida con el sn proporcionado en countData
        const store = await Store.findOne({ sn: countData.sn }).exec();
    
        // Si se encuentra un Store que coincide, usar su idStore, de lo contrario dejar idStore como vacío
        countData.idStore = store ? store.idStore : '';
    
        // Crear la entrada de CountData con el idStore agregado
        const countDataEntry = new CountData(countData);
        
        // Guardar en la base de datos
        await countDataEntry.save();
        
        console.log('Se Guardo correctamente con idStore:', countData.idStore);
      } catch (err) {
        console.error('Error saving count data:', err);
      }
}

module.exports = {
  saveHeartbeatDataBase,
  saveCountDataBase
};