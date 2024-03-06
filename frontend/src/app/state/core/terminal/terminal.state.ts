import { TerminalMessage } from '../../../modules/core/models/interfaces/terminal-message.interface';

export interface TerminalState {
	messages: TerminalMessage[];
	error: any | null;
}
