const OTP = require('../models/otp');
const generateOTP = require('../utils/generateOTP');
const usersService = require("./usersService")

module.exports= {
  // Generar y guardar OTP
  generateAndSaveOTP: async (email) => {
    await OTP.deleteOne({ email });
    const otp = generateOTP();
    const otpData = await OTP.create({ email, otp });
    return otpData;
  },

  // Verificar OTP
  verifyOTP: async function  (email, otp) {
    const otpData = await OTP.findOne({ email, otp });
    if (!otpData) {
      throw new Error('OTP inválido o ha expirado.');
    }
    await OTP.deleteOne({ email }); // Eliminar OTP después de la verificación
    return true;
  },
  changeUserPassword: async (email, otp, newPassword) => {
    // Primero, verifica el OTP
    const otpData = await OTP.findOne({ email, otp });
    if (!otpData) {
      throw new Error('OTP inválido o ha expirado.');
    }
    await OTP.deleteOne({ email }); // Eliminar OTP después de la verificación

    // Ahora, encuentra al usuario por correo electrónico y cambia la contraseña
    const user = await usersService.getUserByEmail(email)
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    
    return await usersService.update(user.id,{password : newPassword}); // Confirma que la contraseña se ha actualizado
  }
};

