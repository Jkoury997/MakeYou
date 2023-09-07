const express = require("express");
const router = express.Router();

// resppuestas
const mainController = require("../controllers/mainController");

//Routeo
router.get("/", mainController.index);
module.exports = router;
