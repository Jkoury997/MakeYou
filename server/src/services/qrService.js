const { response } = require('express');
const QRCode = require('../database/models/QRcode');

module.exports = {
    save: async function(data) {
        try {
            const newQr = new QRCode(data);
            await newQr.save();
            return newQr;
        } catch (error) {
            console.error('Error al guardar el QR:', error.message || error);
            throw error;
        }
    },
    list: async function() {
        try {
            return await QRCode.find();
        } catch (error) {
            console.error('Error al recuperar los QR Codes:', error.message || error);
            throw error;
        }
    },
    findByUuid: async function(uuid) {
        try {
            const response = await QRCode.findOne({ uuid: uuid });
            if (!response) {
                throw new Error('QR Code no encontrado');
            }
            return response;
        } catch (error) {
            console.error('Error al recuperar el QR Code:', error.message || error);
            throw error;
        }
    },
}