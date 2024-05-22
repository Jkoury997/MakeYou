const express = require('express');
const router = express.Router();

const analyticsController = require('../controllers/analyticsController');



router.get('/statistics', analyticsController.getStatistics);

router.get('/statistics/timedate', analyticsController.getTimeStatisticsDate);

router.get('/statistics/timeday', analyticsController.getTimeStatisticsDay);

router.get('/prepare-data', analyticsController.prepareData);  // Nueva ruta
router.get('/prepare-data/hours', analyticsController.prepareDataHours);  // Nueva ruta
router.get('/prepare-data/day', analyticsController.prepareDataDay);  // Nueva ruta
router.get('/prepare-data/week', analyticsController.prepareDataWeek);  // Nueva ruta
router.get('/prepare-data/range', analyticsController.prepareDataRange);  // Nueva ruta






module.exports = router;