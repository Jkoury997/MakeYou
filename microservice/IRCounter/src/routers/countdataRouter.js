const express = require('express');
const router = express.Router();
const countDataController = require('../controllers/countdataController');

router.post('/create', countDataController.create);
router.get('/list', countDataController.listAll);
router.get('/search', countDataController.search);
router.put('/update/:uuid', countDataController.update);
router.delete('/delete/:uuid', countDataController.delete);


// Ruta para búsqueda avanzada de CountData
router.get('/search/advanced', countDataController.advancedSearch);


module.exports = router;
