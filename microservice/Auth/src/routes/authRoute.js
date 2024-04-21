const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Requiere middlewares
const verifyToken = require("../middlewares/verifyToken")


// Ruta para registrar un nuevo usuario
router.post('/register', authController.registerUser);
// Ruta para iniciar session
router.post('/login',authController.login)

// Comprbacion de token
router.get('/verifyToken',verifyToken, authController.verifyToken)

module.exports = router;