const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '15m' } // El OTP expira después de 15 minutos
  }
});

module.exports = mongoose.model('OTP', otpSchema);
