const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const storesRoutes = require("./storesRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const qrRoutes = require("./qrRoutes");
const processRoutes = require("./processRoutes");



const checkToken = require("../middlewares/checkToken");

router.use(checkToken)
router.get("/dashboard",adminController.home);
router.use("/stores",storesRoutes);
router.use("/analytics",analyticsRoutes)
router.use("/qr",qrRoutes)
router.use("/process",processRoutes)

module.exports = router