const QRCode = require('../database/models/QRcode');
const path = require("path")
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
    generateQR: async function(uuid) {

        const data = await QRCode.findOne({ uuid: uuid });
        if (!data) {
            throw new Error('QR Code no encontrado');
        }

        console.log(data)

        const url = `https://mkapp.online/showqr/${uuid}`
        const logo = path.join(__dirname, `../../public/images/${data.logo}.png`);

        try{ 
            let qrBuffer = await makerQR.toBuffer(url, {
                type: 'png',
                width: 300,
                errorCorrectionLevel: 'H'
            });
            
            const resizedLogo = await sharp(logo).resize(80, 80).toBuffer();
            
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



    }
}