import { createActionGroup, props } from '@ngrx/store';
import { ParametersDto } from '../../../services/client/models/parameters/parameter.interface-dto';

export const ParameterActions = createActionGroup({
	source: '[Core -> Parameter]',
	events: {
		'Load Parameters': props<{ arg: string }>(),
		'Load Parameters Success': props<{ arg: string; parameters: ParametersDto[] }>(),
		'Load Parameters Failure': props<{ arg: string; error: any }>()
	}
});
