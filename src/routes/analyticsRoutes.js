const express = require("express");
const router = express.Router();

const storesController = require("../controllers/storesController")
const reviewsController = require("../controllers/reviewsController")



router.get("/sales",storesController.showSaleStores)
router.post("/sales",storesController.salesStores)


router.get("/reviews",reviewsController.showReviews)
router.post("/addPlaceID",reviewsController.addPlaceId)

    

module.exports = router