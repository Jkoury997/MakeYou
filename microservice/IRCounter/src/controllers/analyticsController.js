const analyticsService = require('../services/analyticsService');

exports.getStatistics = async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        const statistics = await analyticsService.calculateStatistics(idStore, startDate, endDate);
        res.json(statistics);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTimeStatisticsDate = async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const statistics = await analyticsService.getTimeStatisticsDate(idStore, startDate, endDate);
        res.json(statistics);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTimeStatisticsDay = async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const statistics = await analyticsService.getTimeStatisticsDay(idStore, startDate, endDate);
        res.json(statistics);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.prepareData = async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const preparedData = await analyticsService.prepareData(idStore, startDate, endDate);
        res.json(preparedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
exports.prepareDataHours= async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const preparedData = await analyticsService.prepareDataHours(idStore, startDate, endDate);
        res.json(preparedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.prepareDataDay= async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const preparedData = await analyticsService.prepareDataDay(idStore, startDate, endDate);
        res.json(preparedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.prepareDataWeek = async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const preparedData = await analyticsService.prepareDataWeek(idStore, startDate, endDate);
        res.json(preparedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.prepareDataRange = async (req, res) => {
    try {
        const idStore = req.query.idStore;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const preparedData = await analyticsService.prepareDataRange(startDate, endDate);
        res.json(preparedData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



