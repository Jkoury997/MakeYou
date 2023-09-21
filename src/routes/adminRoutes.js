const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const storesRoutes = require("./storesRoutes");


const checkToken = require("../middlewares/checkToken");

router.use(checkToken)
router.get("/dashboard",adminController.home);
router.use("/stores",storesRoutes);

module.exports = router