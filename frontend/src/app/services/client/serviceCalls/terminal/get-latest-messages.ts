import { ServiceCallGET } from '../service-call';

export class GetLatestMessages extends ServiceCallGET<string[]> {
	constructor() {
		super(`latest-messages`, undefined, undefined, false);
	}
}
