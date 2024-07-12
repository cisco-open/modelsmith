import { NotificationTypes } from '../../../shared/components/ms-banner/models/snackbar-types.enum';

export interface TerminalMessage {
	data: string;
	type: NotificationTypes;
}
