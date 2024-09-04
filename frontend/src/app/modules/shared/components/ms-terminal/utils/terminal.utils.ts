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

import { IBuffer } from 'xterm';
import { colorCodeMap } from '../models/color-code.map';
import { TerminalMessage } from '../models/terminal-message.interface';

export const logMessageWithControlChars = (message: string): void => {
	const visibleMessage = message.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
	console.log(visibleMessage);
};

export const formatMessageByType = (message: TerminalMessage): string => {
	const colorCode = colorCodeMap.get(message.type) || '\x1b[38;5;0m';
	const formattedData = message.data.endsWith('\n') ? message.data.slice(0, -1) : message.data;
	return `${colorCode}${formattedData}\x1b[0m`;
};

export const highlightText = (text: string, searchTerm: string): string => {
	if (!searchTerm) return text;

	const lowerText = text.toLowerCase();
	const lowerSearchTerm = searchTerm.toLowerCase();
	const highlightStart = '\x1b[48;5;220m';
	const highlightEnd = '\x1b[0m';
	const parts: string[] = [];
	let lastIndex = 0;
	let index: number;

	while ((index = lowerText.indexOf(lowerSearchTerm, lastIndex)) !== -1) {
		parts.push(
			text.slice(lastIndex, index),
			highlightStart,
			text.slice(index, index + searchTerm.length),
			highlightEnd
		);
		lastIndex = index + searchTerm.length;
	}

	parts.push(text.slice(lastIndex));
	return parts.join('');
};

export const arraysAreEqual = (arr1: string[], arr2: string[]): boolean => {
	if (arr1.length !== arr2.length) return false;
	const set1 = new Set(arr1);
	return arr2.every((item) => set1.has(item));
};

export const getTerminalLines = (buffer: IBuffer): string[] => {
	const lines: string[] = [];

	for (let i = 0; i < buffer.length; i++) {
		const line = buffer.getLine(i);
		if (line) {
			lines.push(line.translateToString(true));
		}
	}

	return lines;
};
