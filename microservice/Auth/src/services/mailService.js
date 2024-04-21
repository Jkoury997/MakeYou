
const transporter = require("../utils/email")
const fs = require('fs');
const path = require('path');

const htmlTemplate = fs.readFileSync(path.join(__dirname, '../../public/html/emailTemplate.html'), 'utf8');


module.exports = {
      sendEmail : async (email, otp) => {
        let HtmlTemplateWithOtp = htmlTemplate.replace('{{otpCode}}', otp);
        const mailOptions = {
          from: process.env.SMTP_USERNAME,
          to: email,
          subject: 'Tu Código OTP',
          html: HtmlTemplateWithOtp
        };
      
        await transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Correo enviado: ' + info.response);
          }
      })
    }
} 
