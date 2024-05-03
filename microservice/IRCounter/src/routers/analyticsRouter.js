const express = require('express');
const router = express.Router();

const analyticsController = require('../controllers/analyticsController');



router.get('/statistics', analyticsController.getStatistics);

router.get('/statistics/timedate', analyticsController.getTimeStatisticsDate);

router.get('/statistics/timeday', analyticsController.getTimeStatisticsDay);




module.exports = router;