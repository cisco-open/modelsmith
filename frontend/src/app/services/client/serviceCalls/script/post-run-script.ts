import { ScriptConfigsDto } from '../../models/script/script-configs.interface-dto';
import { ServiceCallPOST } from '../service-call';

export class PostRunScript extends ServiceCallPOST<any> {
	constructor(body: ScriptConfigsDto) {
		super(`/run-script`, body, false);
	}
}
