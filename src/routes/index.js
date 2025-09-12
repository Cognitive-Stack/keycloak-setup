const express = require('express');
const flowRouter = require('./flow');

const router = express.Router();

router.use(flowRouter);

module.exports = router;
