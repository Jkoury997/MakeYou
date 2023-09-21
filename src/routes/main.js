const express = require("express");
const router = express.Router();

// resppuestas
const mainController = require("../controllers/mainController");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");
//Routeo
router.get("/", mainController.index);
router.use("/auth",authRoutes);
router.use("/admin",adminRoutes);
module.exports = router;
