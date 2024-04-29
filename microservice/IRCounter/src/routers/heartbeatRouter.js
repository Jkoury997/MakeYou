
const express = require('express');
const router = express.Router();

const heartbeatController = require("../controllers/heartbeatController");
const { route } = require('./storeRoute');


router.post("/create",heartbeatController.create);

router.get('/list', heartbeatController.listAll);

router.get('/search', heartbeatController.search);

route.get("/searchlast",heartbeatController.searchLatestBySN)


// Ruta para actualizar
router.put('/update/:uuid', heartbeatController.update);

// Ruta para eliminar
router.delete('/delete/:uuid', heartbeatController.delete);

module.exports = router
