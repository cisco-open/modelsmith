const express = require('express');
const router = express.Router();
const { OK, NOT_FOUND } = require('../constants/httpStatusCodes');
const { getActiveScriptDetails, getPreviousScriptDetails } = require('../state/scriptState');
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');
const satisticsParserInstance = require('../parsers/statisticsParser');

router.get('/statistics', (req, res) => {
	let currentScript = getActiveScriptDetails() || getPreviousScriptDetails();

	if (!currentScript || currentScript.algorithm.type !== ALGORITHM_TYPES.MACHINE_UNLEARNING) {
		return res.status(NOT_FOUND).send();
	}

	const { statistics = {} } = satisticsParserInstance;

	res.status(OK).send(statistics);
});

module.exports = router;
