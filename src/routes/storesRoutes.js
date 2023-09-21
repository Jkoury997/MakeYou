const express = require("express");
const router = express.Router();

const storesController = require("../controllers/storesController")

router.get("/",storesController.listStores)
router.post("/pickList", storesController.listProductsToPick)


module.exports = router