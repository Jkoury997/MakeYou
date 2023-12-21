const express = require("express");
const router = express.Router();

// resppuestas
const qrController = require("../controllers/processController");
//Routeo
router.get("/read", qrController.ShowRead);
//router.post("/create", qrController.create);


module.exports = router;