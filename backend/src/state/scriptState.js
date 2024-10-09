//   Copyright 2024 Cisco Systems, Inc.

//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at

//       http://www.apache.org/licenses/LICENSE-2.0

//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

//  SPDX-License-Identifier: Apache-2.0

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
