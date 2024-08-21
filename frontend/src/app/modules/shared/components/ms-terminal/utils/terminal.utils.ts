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
