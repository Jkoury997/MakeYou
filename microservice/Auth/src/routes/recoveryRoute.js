const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Ruta para solicitar OTP
router.post('/request-otp', otpController.sendOTP);

// Ruta para verificar OTP
router.post('/verify-otp', otpController.verifyOTP);

// Ruta para verificar OTP
router.post('/changePassword', otpController.changePassword);

module.exports = router;