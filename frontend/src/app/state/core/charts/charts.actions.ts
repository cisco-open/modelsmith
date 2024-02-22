import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ChartTypeEnum } from '../../../modules/shared/models/enums/chart-type.enum';
import {
	MachineUnlearningProgress,
	PruningProgress,
	QuantizationProgress
} from '../../../services/client/models/charts/chart-data.interface-dto';
import { ChartConfigurationSettingsDictionary } from '../../../services/client/models/charts/chart-settings.interface-dto';

export const ChartActions = createActionGroup({
	source: '[Core -> Charts]',
	events: {
		'Get Current Pruning Chart Data': emptyProps(),
		'Get Current Pruning Chart Data Success': props<{
			pruningProgress: PruningProgress[];
		}>(),
		'Get Current Pruning Chart Data Failure': props<{ error: any }>(),
		'Get Current Quantization Chart Data': emptyProps(),
		'Get Current Quantization Chart Data Success': props<{
			quantizationProgress: QuantizationProgress;
		}>(),
		'Get Current Quantization Chart Data Failure': props<{ error: any }>(),
		'Get Current Machine Unlearning Chart Data': emptyProps(),
		'Get Current Machine Unlearning Chart Data Success': props<{
			machineUnlearningProgress: MachineUnlearningProgress;
		}>(),
		'Get Current Machine Unlearning Chart Data Failure': props<{ error: any }>(),
		'Get Chart Configuration Settings': props<{ chartTypes: ChartTypeEnum[] }>(),
		'Get Chart Configuration Settings Success': props<{ settings: ChartConfigurationSettingsDictionary }>(),
		'Get Chart Configuration Settings Failure': props<{ error: any }>()
	}
});
