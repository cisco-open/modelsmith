import { ServiceCallPOST } from '../service-call';

export class PostStopScript extends ServiceCallPOST<any> {
	constructor() {
		super(`/stop-script`, {}, false);
	}
}
