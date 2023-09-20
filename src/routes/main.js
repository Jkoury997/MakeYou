const express = require("express");
const router = express.Router();

// resppuestas
const mainController = require("../controllers/mainController");
const routesController = require("./authRoutes");

//Routeo
router.get("/", mainController.index);
router.use("/auth",routesController);
module.exports = router;
