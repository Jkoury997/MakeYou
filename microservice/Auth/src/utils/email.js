const nodemailer = require('nodemailer');
// Configurar el transporte SMTP
const transporter = nodemailer.createTransport({
  host: 'c2091877.ferozo.com', // El servidor SMTP proporcionado
  port: 465, // El puerto SMTP para SSL
  secure: true, // true para una conexión segura SSL
  auth: {
    user: 'no-responder@mkapp.store',
    pass: '*Marcela1973' // Tu contraseña SMTP
  },
  tls: {
    // Esto es necesario si el servidor tiene un certificado auto-firmado
    // En producción, debes tener un certificado válido y eliminar esta línea
    rejectUnauthorized: false
  }
});

module.exports = transporter