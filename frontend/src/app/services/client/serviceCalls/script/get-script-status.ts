import { ScriptStatusDto } from '../../models/script/script-status.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetScriptStatus extends ServiceCallGET<ScriptStatusDto> {
	constructor() {
		super(`script-status`, undefined, undefined, false);
	}
}
