import { ServiceCallPUT } from '../service-call';

export class PostLogout extends ServiceCallPUT {
	constructor() {
		super(`user/logout`);

		if (this.mock) {
			this.url += '/put-response-body-200.json';
		}
	}
}
