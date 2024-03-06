import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TerminalMessage } from '../../../modules/core/models/interfaces/terminal-message.interface';

export const TerminalActions = createActionGroup({
	source: '[Core -> Terminal]',
	events: {
		'Get Latest Messages': emptyProps(),
		'Get Latest Messages Success': props<{ messages: TerminalMessage[] }>(),
		'Get Latest Messages Failure': props<{ error: any }>(),
		'Post Clear History': emptyProps(),
		'Post Clear History Success': emptyProps(),
		'Post Clear History Failure': props<{ error: any }>()
	}
});
