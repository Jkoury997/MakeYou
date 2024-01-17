const express = require("express");
const router = express.Router();
const qrController = require("../controller/qrController")


router.post("/create",qrController.create)
router.get("/list",qrController.listAll)
router.get("/id/:uuid",qrController.getById)
router.get('/downloadContact/:uuid', qrController.downloadContact);





module.exports = router