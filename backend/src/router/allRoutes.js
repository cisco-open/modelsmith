const express = require('express');
const router = express.Router();

const scriptsRouter = require('./scriptsRouter');
const uploadFileRouter = require('./uploadFileRouter');
const modelsRouter = require('./modelsRouter');
const parametersRouter = require('./parametersRouter');
const chartsRouter = require('./chartsRouter');
const terminalRouter = require('./terminalRouter');
const statisticsRouter = require('./statisticsRouter');

router.use('/', scriptsRouter);
router.use('/', uploadFileRouter);
router.use('/', modelsRouter);
router.use('/', parametersRouter);
router.use('/', chartsRouter);
router.use('/', terminalRouter);
router.use('/', statisticsRouter);

module.exports = router;
