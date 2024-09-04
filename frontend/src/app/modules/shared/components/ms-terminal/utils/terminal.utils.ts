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

import { TerminalMessageType } from '../models/terminal-message-type.enum';
import { TerminalMessage } from '../models/terminal-message.interface';

export const logMessageWithControlChars = (message: string): void => {
	const visibleMessage = message.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
	console.log(visibleMessage);
};

export const formatMessageByType = (message: TerminalMessage): string => {
	let colorCode = '';
	switch (message.type) {
		case TerminalMessageType.ERROR:
			colorCode = '\x1b[38;5;124m';
			break;
		case TerminalMessageType.SUCCESS:
			colorCode = '\x1b[38;5;22m';
			break;
		case TerminalMessageType.WARNING:
			colorCode = '\x1b[38;5;136m';
			break;
		case TerminalMessageType.INFO:
		default:
			colorCode = '\x1b[38;5;0m';
			break;
	}

	let formattedData = message.data;
	if (formattedData.endsWith('\n')) {
		formattedData = formattedData.slice(0, -1);
	}

	return `${colorCode}${formattedData}\x1b[0m`;
};

export const highlightText = (text: string, searchTerm: string): string => {
	if (!searchTerm) return text;

	const lowerText = text.toLowerCase();
	const lowerSearchTerm = searchTerm.toLowerCase();
	const highlightStart = '\x1b[48;5;220m';
	const highlightEnd = '\x1b[0m';
	let result = '';
	let lastIndex = 0;
	let index: number;

	while ((index = lowerText.indexOf(lowerSearchTerm, lastIndex)) !== -1) {
		result += text.slice(lastIndex, index);
		result += highlightStart;
		result += text.slice(index, index + searchTerm.length);
		result += highlightEnd;
		lastIndex = index + searchTerm.length;
	}

	result += text.slice(lastIndex);
	return result;
};
