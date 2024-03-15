import { NotificationTypes } from '../enums/snackbar-types.enum';

export interface TerminalMessage {
	data: string;
	type: NotificationTypes;
}
