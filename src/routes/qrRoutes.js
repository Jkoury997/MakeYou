const express = require("express");
const router = express.Router();

// resppuestas
const qrController = require("../controllers/qrController");
//Routeo
router.get("/create", qrController.showCreate);
router.post("/create", qrController.create);
router.get("/list",qrController.list)

module.exports = router;