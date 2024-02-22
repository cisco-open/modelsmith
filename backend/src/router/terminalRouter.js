// websocketRouter.js
const express = require('express');
const router = express.Router();
const { OK } = require('../constants/httpStatusCodes');
const { clearMessageHistory, getMessagesHistory } = require('../state/terminalMessagesState');

router.get('/latest-messages', (req, res) => {
	const latestMessages = getMessagesHistory();
	res.status(OK).send(latestMessages);
});

router.post('/clear-history', (req, res) => {
	clearMessageHistory();
	res.status(OK).send({ message: 'Message history cleared.' });
});

module.exports = router;
