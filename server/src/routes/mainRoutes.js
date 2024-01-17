const express = require("express");
const router = express.Router();
const qrRoutes = require("./qrRoutes")


router.use("/qr",qrRoutes)




module.exports = router