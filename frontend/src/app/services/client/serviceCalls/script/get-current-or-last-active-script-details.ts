import { ScriptDetails } from '../../models/script/script-details.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetCurrentOrLastActiveScriptDetails extends ServiceCallGET<ScriptDetails> {
	constructor() {
		super(`/current-or-last-active-script-details`, undefined, undefined, false);
	}
}
