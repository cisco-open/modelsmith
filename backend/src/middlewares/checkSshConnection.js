const { getConnectionStatus } = require('../facades/executionFacade');

module.exports = (req, res, next) => {
	if (getConnectionStatus() !== 'READY') {
		res.status(503).send({ error: 'Service Unavailable: Unable to execute commands at this time.' });
	} else {
		next();
	}
};
