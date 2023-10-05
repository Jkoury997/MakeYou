const { QRCode } = require('../../models');
const makerQR = require('qrcode');

module.exports = {
    save: async function(data){
        try {
            const newQr = await QRCode.create(data);
            
            return newQr;
        } catch (error) {
            console.error('Error al hacer la solicitud:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
    findAll: async function(){
        try {
            const allQrCodes = await QRCode.findAll();
            return allQrCodes;
        } catch (error) {
            console.error('Error al recuperar los QR Codes:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
    findByUuid: async function(uuid){
        try {
            const qrCode = await QRCode.findOne({ where: { uuid: uuid } });
            return qrCode;
        } catch (error) {
            console.error('Error al recuperar el QR Code:', error.response ? error.response.data : error.message);
            throw error;
        }
    },
    generateQRFromURL: async function(url) {
            try {
                // Genera una promesa que resuelve en un Buffer
                const qrBuffer = await makerQR.toBuffer(url);
                return qrBuffer;
            } catch (error) {
                console.error('Error generando el código QR:', error);
                throw error;
            }
        }
    
}