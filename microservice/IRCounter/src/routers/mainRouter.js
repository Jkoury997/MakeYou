
const express = require('express');
const router = express.Router();

const storeRoute = require("./storeRoute")
const countData = require("./countdataRouter")
const heartBeat = require("./heartbeatRouter")



router.use("/store",storeRoute)
router.use("/countdata",countData)
router.use("/heartbeat",heartBeat)


module.exports = router;
