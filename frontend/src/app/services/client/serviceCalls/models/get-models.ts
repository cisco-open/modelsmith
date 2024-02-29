import { ScriptStatusDto } from '../../models/script/script-status.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetModels extends ServiceCallGET<ScriptStatusDto> {
	constructor() {
		super(`model-files`, undefined, undefined, false);
	}
}
