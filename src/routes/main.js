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
router.get('/showQR/:uuid', qrController.showByUuid);
module.exports = router;
