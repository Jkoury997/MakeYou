const qrService = require("../services/qrService");
const vCardsJS = require('vcards-js');

module.exports = {
    create: async (req, res) => {
        try {
            // Recuperar datos del cuerpo de la solicitud
            const data = req.body;

            console.log(data);

            // Guardar los datos en la base de datos usando qrService
            const savedQR = await qrService.save(data);

            // Enviar respuesta con los datos guardados y un código de estado 201 (Created)
            res.status(201).json(savedQR);
        } catch (error) {
            // Enviar respuesta de error con un código de estado 500 (Internal Server Error)
            res.status(500).json({ error: error.message || "Error interno del servidor" });
        }
    },
    listAll: async function (req, res) {
        try {
            const allQrCodes = await qrService.list();
            
            // Enviar una respuesta JSON con el código de estado 200
            res.status(200).json({
                qrCodes: allQrCodes
            });
        } catch (error) {
            console.error('Error:', error);
            
            // Enviar una respuesta de error con el código de estado 500
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    getById: async function (req,res) {
        const uuid = req.params.uuid
        try {
            const response = await qrService.findByUuid(uuid)
            res.status(200).json(
                response
            )
        } catch (error) {
            console.error('Error:', error);
            
            // Enviar una respuesta de error con el código de estado 500
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    downloadContact: async function (req, res) {
        const uuid = req.params.uuid
        const qrCode = await qrService.findByUuid(uuid);

    if (!qrCode) {
        res.status(404).send('QR Code no encontrado');
        return;
    }

    var vCard = vCardsJS();
    //set properties
    vCard.firstName = qrCode.name;
    vCard.lastName = qrCode.lastname;
    vCard.organization = qrCode.company;
    vCard.workPhone = qrCode.phone;
    vCard.title = qrCode.titlejob;
    vCard.url = qrCode.website;
    vCard.workEmail =qrCode.email;
    vCard.workAddress.street = qrCode.address;

    console.log(vCard)
    //save to file
    const filename = `${qrCode.name}-${qrCode.lastname}.vcf`;
    vCard.saveToFile(`./${filename}.vcf`);

    //set content-type and disposition including desired filename
    res.set('Content-Type', `text/vcard; name="${filename}"`);
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
  
    //send the response
    res.send(vCard.getFormattedString());

    },
}