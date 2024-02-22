import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { KeyValue } from '../../../services/client/models/key-value/key-value.interface-dto';

export const StatisticsActions = createActionGroup({
	source: '[Core -> Statistics]',
	events: {
		'Get Statistics': emptyProps(),
		'Get Statistics Success': props<{ statistics: KeyValue<string> }>(),
		'Get Statistics Failure': props<{ error: any }>(),
		'Update Statistics': props<{ statistics: KeyValue<string> }>()
	}
});
