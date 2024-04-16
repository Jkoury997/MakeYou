
const express = require('express');
const router = express.Router();

const storeController = require("../controllers/storeController")


router.post("/create",storeController.create);

router.get('/list', storeController.listAll);

router.get('/search', storeController.search);


// Ruta para actualizar
router.put('/update/:uuid', storeController.update);

// Ruta para eliminar
router.delete('/delete/:uuid', storeController.delete);


module.exports = router;
