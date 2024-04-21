const express = require('express');
const authRoute  = require('../routes/authRoute');
const usersRoute  = require('../routes/usersRoute');
const recoveryRoute  = require('../routes/recoveryRoute');
const router = express.Router();

router.use('/auth',authRoute);
router.use('/users',usersRoute);
router.use('/recoveryPassword',recoveryRoute);

module.exports = router;