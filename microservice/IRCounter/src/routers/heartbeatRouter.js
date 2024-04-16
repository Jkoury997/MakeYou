
const express = require('express');
const router = express.Router();

const heartbeatController = require("../controllers/heartbeatController")


router.post("/create",heartbeatController.create);

router.get('/list', heartbeatController.listAll);

router.get('/search', heartbeatController.search);


// Ruta para actualizar
router.put('/update/:uuid', heartbeatController.update);

// Ruta para eliminar
router.delete('/delete/:uuid', heartbeatController.delete);

module.exports = router
