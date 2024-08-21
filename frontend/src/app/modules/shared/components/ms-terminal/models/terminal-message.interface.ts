import { TerminalMessageType } from './terminal-message-type.enum';

export interface TerminalMessage {
	data: string;
	type: TerminalMessageType;
}
