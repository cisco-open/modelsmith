import { ServiceCallPOST } from '../service-call';

export class PostClearHistory extends ServiceCallPOST<any> {
	constructor() {
		super(`clear-history`, {}, false);
	}
}
