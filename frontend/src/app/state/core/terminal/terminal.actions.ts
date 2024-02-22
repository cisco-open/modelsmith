import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TerminalActions = createActionGroup({
	source: '[Core -> Terminal]',
	events: {
		'Get Latest Messages': emptyProps(),
		'Get Latest Messages Success': props<{ messages: string[] }>(),
		'Get Latest Messages Failure': props<{ error: any }>(),
		'Post Clear History': emptyProps(),
		'Post Clear History Success': emptyProps(),
		'Post Clear History Failure': props<{ error: any }>()
	}
});
