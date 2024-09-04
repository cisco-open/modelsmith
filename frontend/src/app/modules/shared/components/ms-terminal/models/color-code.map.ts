import { TerminalMessageType } from './terminal-message-type.enum';

export const colorCodeMap = new Map<TerminalMessageType, string>([
	[TerminalMessageType.ERROR, '\x1b[38;5;124m'],
	[TerminalMessageType.SUCCESS, '\x1b[38;5;22m'],
	[TerminalMessageType.WARNING, '\x1b[38;5;136m'],
	[TerminalMessageType.INFO, '\x1b[38;5;0m']
]);
