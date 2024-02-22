import { createActionGroup, props } from '@ngrx/store';
import { ScriptConfigsDto } from '../../../services/client/models/script/script-configs.interface-dto';

export const FileActions = createActionGroup({
	source: '[Core -> File]',
	events: {
		'Upload File': props<{ file: File }>(),
		'Upload File Success': props<{ data: any }>(),
		'Upload File Failure': props<{ error: any }>(),
		'Upload File and Call Script': props<{ file: File | null; configs: ScriptConfigsDto }>()
	}
});
