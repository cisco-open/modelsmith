const { ScriptState, getScriptState } = require('../state/scriptState');
const { BAD_REQUEST } = require('../constants/httpStatusCodes');

function checkIfNoScriptRunning(req, res, next) {
	if (getScriptState() !== ScriptState.RUNNING) {
		return res.status(BAD_REQUEST).send({ error: 'No script is currently running.' });
	}
	next();
}

module.exports = checkIfNoScriptRunning;
