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

let messageHistory = [];
let fullMessageHistory = [];

const MAX_HISTORY_MESSAGES = 300;

module.exports = {
	getMessagesHistory: () => messageHistory,
	getFullMessageHistory: () => fullMessageHistory,
	addToMessageHistory: (message) => {
		if (message === 'clear') {
			messageHistory = [];
			return;
		}

		fullMessageHistory.push(message);

		messageHistory.push(message);
		if (messageHistory.length > MAX_HISTORY_MESSAGES) {
			messageHistory.shift();
		}
	}
};
