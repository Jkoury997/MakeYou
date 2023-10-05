const express = require("express");
const router = express.Router();

// resppuestas
const mainController = require("../controllers/mainController");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
const qrController = require("../controllers/qrController");
//Routeo
router.get("/", mainController.index);
router.use("/auth",authRoutes);
router.use("/admin",adminRoutes);

//Qr publico
router.get('/showQR/:uuid', qrController.showByUuid);
router.get('/downloadContact/:uuid', qrController.downloadContact);
router.get('/downloadQR/:uuid', qrController.downloadQR);
module.exports = router;
