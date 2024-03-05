const express = require('express');
const router = express.Router();
const { OK } = require('../constants/httpStatusCodes');
const getModelsByType = require('../constants/modelsConstants');

router.get('/models-list/:type', (req, res) => {
	const type = req.params.type;
	const models = getModelsByType(type);

	if (models.length === 0) {
		return res.status(404).send('Model type not found');
	}

	res.status(OK).send(models);
});

module.exports = router;
