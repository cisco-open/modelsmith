import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ModelActions = createActionGroup({
	source: '[Model]',
	events: {
		'Load Models': emptyProps(),
		'Load Models Success': props<{ models: string[] }>(),
		'Load Models Failure': props<{ error: any }>()
	}
});
