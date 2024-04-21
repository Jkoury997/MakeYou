
const express = require('express');
const router = express.Router();

const storeRoute = require("./storeRoute")
const countData = require("./countdataRouter")
const heartBeat = require("./heartbeatRouter")


// Requiere middlewares
const verifyToken = require("../middlewares/verifyToken")
router.use(verifyToken)

router.use("/store",storeRoute)
router.use("/countdata",countData)
router.use("/heartbeat",heartBeat)


module.exports = router;
