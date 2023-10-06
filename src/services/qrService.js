const { QRCode } = require('../../models');
const makerQR = require('qrcode');
const sharp = require('sharp');

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
    update: async function(uuid, data){
        try {
            // Encuentra el QRCode por UUID
            const qrCode = await QRCode.findOne({ where: { uuid: uuid } });
            
            if (!qrCode) {
                throw new Error('QR Code no encontrado');
            }
    
            // Actualiza el QRCode con los nuevos datos
            await qrCode.update(data);
    
            return qrCode;
    
        } catch (error) {
            console.error('Error al actualizar el QR Code:', error.message || error);
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
    },
    generateQRWithLogo: async function (data, logoPath) {
        try {
            let qrBuffer = 0
            if(data.typeQr === "WiFi"){
                const  wifiString = `WIFI:T:${data.networkType};S:${data.ssid};P:${data.password};;`;
                qrBuffer = await makerQR.toBuffer(wifiString,{
                    type: 'png',
                    width: 300, // Ajusta según tus necesidades
                    errorCorrectionLevel: 'H' // 'H' permite una mayor superposición sin perder la capacidad de escaneo
                })
            }else{
                // Generar el código QR como PNG
                qrBuffer = await makerQR.toBuffer(data, {
                    type: 'png',
                    width: 300, // Ajusta según tus necesidades
                    errorCorrectionLevel: 'H' // 'H' permite una mayor superposición sin perder la capacidad de escaneo
                });

            }
    
            // Redimensiona el logo a 100x100
            const resizedLogo = await sharp(logoPath).resize(80, 80).toBuffer();
            
             // Crea un círculo blanco de 100x100
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

        // Superpone el logo redimensionado en el centro del círculo blanco
        const logoOnWhiteCircle = await sharp(whiteCircle)
        .composite([{
            input: resizedLogo,
            gravity: 'center'
        }])
        .toBuffer();

        // Usa Sharp para superponer el logo (con el fondo blanco circular) en el centro del QR
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
typeQr: async function(type,data) {
    try {

    
    if(type === "Vcard"){
        const whatsapp = `https://api.whatsapp.com/send?phone=54${data.urlWhatsapp}`
        const dataNew = {
        ...req.body,
        urlWhatsapp : whatsapp,
        whatsapp : req.body.urlWhatsapp
        }
        return dataNew;
    }else {
        return data
    }


    } catch (err) {
        console.error("Error generando QR con logo:", err);
        throw err;
    }
}
    
}
