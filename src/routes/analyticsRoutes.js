const express = require("express");
const router = express.Router();

const storesController = require("../controllers/storesController")

router.get("/",storesController.showSaleStores)
router.post("/sales",storesController.salesStores)

module.exports = router