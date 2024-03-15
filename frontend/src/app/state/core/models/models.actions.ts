import { createActionGroup, props } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';
import { ModelDto } from '../../../services/client/models/models/models.interface-dto';

export const ModelsActions = createActionGroup({
	source: '[Models]',
	events: {
		'Get Models List': props<{ algorithmType: AlgorithmType }>(),
		'Get Models List Success': props<{ algorithmType: AlgorithmType; models: ModelDto[] }>(),
		'Get Models List Failure': props<{ error: any }>(),
		'Get Current Or Previous Selected Model': props<{ algorithmType: AlgorithmType }>(),
		'Get Current Or Previous Selected Model Success': props<{ model: string }>(),
		'Get Current Or Previous Selected Model Failure': props<{ error: any }>()
	}
});
