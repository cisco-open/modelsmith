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
