import { createActionGroup, props } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';

export const ModelsActions = createActionGroup({
	source: '[Models]',
	events: {
		'Get Models List': props<{ algorithmType: AlgorithmType }>(),
		'Get Models List Success': props<{ algorithmType: AlgorithmType; models: string[] }>(),
		'Get Models List Failure': props<{ error: any }>()
	}
});
