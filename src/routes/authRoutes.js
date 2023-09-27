const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login",authController.login);

router.post("/login",authController.authLogin);

router.post("/businessSelect",authController.authBusiness);


module.exports = router