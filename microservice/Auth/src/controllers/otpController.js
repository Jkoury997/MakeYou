const otpService = require('../services/otpService');
const mailService = require("../services/mailService")

const otpController = {
  // Controlador para enviar OTP
  sendOTP: async (req, res) => {
    try {
      const {email} = req.body;
      const otpData = await otpService.generateAndSaveOTP(email);
      // Aquí debes agregar el código para enviar el OTP al email del usuario
      await mailService.sendEmail(email, otpData.otp);
      res.status(200).json({ message: "OTP enviado exitosamente."});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Controlador para verificar OTP
  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;
      await otpService.verifyOTP(email, otp);
      res.status(200).json({ message: "OTP verificado exitosamente." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      await otpService.changeUserPassword(email, otp, newPassword);
      res.json({ message: "La contraseña ha sido actualizada correctamente." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = otpController;
