const express = require("express");
const router = express.Router();

// resppuestas
const qrController = require("../controllers/qrController");
//Routeo
router.get("/create", qrController.showCreate);
router.post("/create", qrController.create);
router.get("/list",qrController.listAll)
router.get("/edit/:id",qrController.showEdit)
router.post("/edit/:id",qrController.edit)

module.exports = router;