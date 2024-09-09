//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

/// <reference lib="webworker" />

import { TerminalMessage } from '../models/terminal-message.interface';
import { formatMessageByType, highlightText } from './terminal.utils';

addEventListener('message', ({ data }) => {
	const { messages, searchTerm } = data;

	const formattedMessages = messages.map((message: TerminalMessage) => {
		let formattedMessage = formatMessageByType(message);
		if (searchTerm) {
			formattedMessage = highlightText(formattedMessage, searchTerm);
		}
		return formattedMessage;
	});

	postMessage(formattedMessages);
});
