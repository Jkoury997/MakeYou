const qrService = require("../services/qrService") 


module.exports = {
    showCreate: function (req,res) {
        res.render("./qr/create",{userName: req.session.userData})
    },
    create: async function (req,res) {
        try {
            const whatsapp = `https://api.whatsapp.com/send?phone=54${req.body.urlWhatsapp}`
            const data = {
            ...req.body,
            urlWhatsapp : whatsapp
            }
            const qrResponse = await qrService.save(data);
            console.log(qrResponse)
            res.redirect("/admin/qr/list")
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
        
    },
    listAll: async function (req, res) {
        try {
            const allQrCodes = await qrService.findAll();
            const cleanedQrCodes = allQrCodes.map(qrCodeInstance => qrCodeInstance.toJSON());
            res.render("./qr/list", {
                qrCodes: cleanedQrCodes ? cleanedQrCodes : null,
                userName: req.session.userData
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    showByUuid: async function (req, res) {
        try {
            const qrCode = await qrService.findByUuid(req.params.uuid);
            if (qrCode) {
                res.render("./qr/showQR", {
                    qrCode: qrCode ? qrCode : null,
                    userName: req.session.userData
                });
            } else {
                res.status(404).send('QR Code no encontrado');
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    downloadContact: async function (req, res) {
        const qrCode = await qrService.findByUuid(req.params.uuid);

    if (!qrCode) {
        res.status(404).send('QR Code no encontrado');
        return;
    }

    const vCardData = `
    BEGIN:VCARD
    VERSION:3.0
    FN:${qrCode.name} ${qrCode.lastname}
    N:${qrCode.lastname};${qrCode.name};;;
    ORG:${qrCode.business}
    TEL;TYPE=CELL:${qrCode.phone}
    EMAIL:${qrCode.email}
    URL:${qrCode.website}
    ADR;TYPE=WORK:;;${qrCode.nameDireccion};;;;
    END:VCARD
    `;

    
    // Enviar como JSON (opción 1)
    res.json({ vCard: vCardData });
    
    },
    downloadQR: async function (req,res) {
        const uuid = req.params.uuid;
        const url = `https://mkapp.com.ar/showQR/${uuid}`;
    
        try {
            const qrBuffer = await qrService.generateQRFromURL(url);
    
            // Establece las cabeceras para informar al navegador que se trata de un archivo para descargar
            res.setHeader('Content-Disposition', `attachment; filename=qr-code.png`);
            res.setHeader('Content-Type', 'image/png');
            res.send(qrBuffer);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
    
    
}