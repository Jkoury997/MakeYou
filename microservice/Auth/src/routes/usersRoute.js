const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController")

//Utilizacion de verifyToken
const verifyToken = require("../middlewares/verifyToken")

router.use(verifyToken)


router.get("/list",usersController.listUsers) //Lista usuario
router.get("/detailID/:id", usersController.getUserById) //Trae usaurio
router.get("/detailEmail/:email", usersController.getUserByEmail) //Trae usaurio



router.post("/update/:id",usersController.updateUser) // Actualiza usuario
router.get("/desactive/:id", usersController.deactivateUser) // Desactiva usuario
router.get("/active/:id", usersController.activeUser) // Desactiva usuario
router.get("/delete/:id", usersController.deleteUser) // Elimina Usuario
module.exports = router;