const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login",authController.login);

router.post("/login",authController.authLogin);

router.post("/businessSelect",authController.authBusiness);

router.get("/forgotPassword",authController.showForgotPassword)
router.post("/forgotPassword",authController.forgotPassword)

router.post("/recoveryPassword",authController.recoveryPassword)


module.exports = router