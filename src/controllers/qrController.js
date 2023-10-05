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
    }
    
    
}