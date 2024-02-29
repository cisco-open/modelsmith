import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ScriptConfigsDto } from '../../../services/client/models/script/script-configs.interface-dto';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';

export const ScriptActions = createActionGroup({
	source: '[Core -> Script]',
	events: {
		'Call Script': props<{ configs: ScriptConfigsDto }>(),
		'Call Script Success': emptyProps(),
		'Call Script Failure': props<{ error: any }>(),
		'Fetch Script Status': emptyProps(),
		'Update Script Status': props<{ status: string }>(),
		'Fetch Script Status Success': props<{ status: string }>(),
		'Fetch Script Status Failure': props<{ error: any }>(),
		'Stop Script': emptyProps(),
		'Stop Script Success': emptyProps(),
		'Stop Script Failure': props<{ error: any }>(),
		'Get Current or Last Active Script Details': emptyProps(),
		'Get Current or Last Active Script Details Success': props<{ scriptDetails: ScriptDetails }>(),
		'Get Current or Last Active Script Details Failure': props<{ error: any }>()
	}
});
