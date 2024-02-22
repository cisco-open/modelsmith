const { ScriptState, getScriptState } = require('../state/scriptState');

const BAD_REQUEST_STATUS = 400;

function checkIfScriptRunning(req, res, next) {
	if (getScriptState() === ScriptState.RUNNING) {
		return res.status(BAD_REQUEST_STATUS).send({ error: 'Script is already running.' });
	}
	next();
}

module.exports = checkIfScriptRunning;
