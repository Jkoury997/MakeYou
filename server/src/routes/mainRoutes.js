const express = require("express");
const router = express.Router();
const qrRoutes = require("./qrRoutes")
const prestashopRoutes  = require("./prestashopRoutes")

router.use("/qr",qrRoutes)
router.use("/prestashop/",prestashopRoutes)




module.exports = router