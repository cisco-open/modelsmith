const ScriptState = {
	NOT_RUNNING: 'not_running',
	RUNNING: 'running',
	STOPPING: 'stopping',
	ERROR: 'error'
};

let scriptState = ScriptState.NOT_RUNNING;
let activeScriptDetails = null;
let scriptsHistory = [];

module.exports = {
	ScriptState,
	getScriptState: () => scriptState,
	setScriptState: (newState) => {
		scriptState = newState;
	},
	getActiveScriptDetails: () => activeScriptDetails,
	setActiveScriptDetails: (details) => {
		if (details === null && activeScriptDetails !== null) {
			scriptsHistory.push(JSON.parse(JSON.stringify(activeScriptDetails)));
		}
		activeScriptDetails = details;
	},
	getScriptsHistory: () => scriptsHistory,
	getPreviousScriptDetails: () => {
		if (scriptsHistory.length > 0) {
			return scriptsHistory[scriptsHistory.length - 1];
		}
		return null;
	}
};
