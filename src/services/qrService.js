const QRCode = require('../database/models/QRcode'); // Asegúrate de que la ruta sea correcta
const makerQR = require('qrcode');
const sharp = require('sharp');

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

    update: async function(uuid, data) {
        try {
            const updatedQr = await QRCode.findOneAndUpdate({ uuid: uuid }, data, { new: true });
            if (!updatedQr) {
                throw new Error('QR Code no encontrado');
            }
            return updatedQr;
        } catch (error) {
            console.error('Error al actualizar el QR Code:', error.message || error);
            throw error;
        }
    },

    findAll: async function() {
        try {
            return await QRCode.find();
        } catch (error) {
            console.error('Error al recuperar los QR Codes:', error.message || error);
            throw error;
        }
    },

    findByUuid: async function(uuid) {
        try {
            const qrCode = await QRCode.findOne({ uuid: uuid });
            if (!qrCode) {
                throw new Error('QR Code no encontrado');
            }
            return qrCode;
        } catch (error) {
            console.error('Error al recuperar el QR Code:', error.message || error);
            throw error;
        }
    },

    generateQRFromURL: async function(url) {
        try {
            const qrBuffer = await makerQR.toBuffer(url);
            return qrBuffer;
        } catch (error) {
            console.error('Error generando el código QR:', error);
            throw error;
        }
    },

    generateQRWithLogo: async function(data, logoPath) {
        try {
            let qrBuffer;
            if (data.typeQr === "WiFi") {
                const wifiString = `WIFI:T:${data.networkType};S:${data.ssid};P:${data.password};;`;
                qrBuffer = await makerQR.toBuffer(wifiString, {
                    type: 'png',
                    width: 300,
                    errorCorrectionLevel: 'H'
                });
            } else {
                qrBuffer = await makerQR.toBuffer(data, {
                    type: 'png',
                    width: 300,
                    errorCorrectionLevel: 'H'
                });
            }
            
            const resizedLogo = await sharp(logoPath).resize(80, 80).toBuffer();
            
            const whiteCircle = await sharp({
                create: {
                    width: 100,
                    height: 100,
                    channels: 4,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                }
            })
            .composite([{
                input: Buffer.from(`<svg><circle cx="50" cy="50" r="50" fill="white"/></svg>`),
                top: 0,
                left: 0
            }])
            .png()
            .toBuffer();
            
            const logoOnWhiteCircle = await sharp(whiteCircle)
            .composite([{
                input: resizedLogo,
                gravity: 'center'
            }])
            .toBuffer();
            
            const combinedImageBuffer = await sharp(qrBuffer)
            .composite([{
                input: logoOnWhiteCircle,
                gravity: 'center'
            }])
            .toBuffer();
            
            return combinedImageBuffer;
        } catch (err) {
            console.error("Error generando QR con logo:", err);
            throw err;
        }
    },
    
    typeQr: async function(type, data) {
        try {
            if (type === "Vcard") {
                const whatsapp = `https://api.whatsapp.com/send?phone=54${data.urlWhatsapp}`;
                const dataNew = {
                    ...data,
                    urlWhatsapp: whatsapp,
                    whatsapp: data.urlWhatsapp
                };
                return dataNew;
            } else {
                return data;
            }
        } catch (err) {
            console.error("Error generando tipo QR:", err);
            throw err;
        }
    }
}
