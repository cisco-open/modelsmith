import { createActionGroup, props } from '@ngrx/store';
import { AppModes } from '../../../modules/core/models/enums/app-modes.enum';

export const ConfigActions = createActionGroup({
	source: '[Core -> Configs]',
	events: {
		'Set Default Mode': props<{ mode: AppModes | undefined }>(),
		'Set Current Mode': props<{ mode: AppModes | undefined }>()
	}
});
