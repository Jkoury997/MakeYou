const express = require("express");
const router = express.Router();
const prestashopController = require("../controller/prestashopController")


//Products
router.get("/products",prestashopController.productList)
router.get("/products/:id",prestashopController.productById);


//Orders
router.get("/orders",prestashopController.orderList)
router.get("/orders/:id",prestashopController.orderById);






module.exports = router