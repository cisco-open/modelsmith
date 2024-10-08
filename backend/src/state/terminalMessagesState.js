//   Copyright 2024 Cisco Systems, Inc. and its affiliates

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

const MESSAGE_TYPES = require('../constants/messageTypes');

let messageHistory = [];
let fullMessageHistory = [];

const MAX_HISTORY_MESSAGES = 50;

module.exports = {
	getMessagesHistory: () => messageHistory,
	getFullMessageHistory: () => fullMessageHistory,
	addToMessageHistory: (messageObject) => {
		if (typeof messageObject === 'string') {
			messageObject = { data: messageObject, type: MESSAGE_TYPES.INFO };
		}

		fullMessageHistory.push(messageObject);

		// Add to limited message history (latest 50)
		messageHistory.push(messageObject);
		if (messageHistory.length > MAX_HISTORY_MESSAGES) {
			messageHistory.shift();
		}
	},
	clearMessageHistory: () => {
		messageHistory = [];
	}
};
