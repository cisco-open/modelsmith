import { ServiceCallGET } from '../service-call';

export class GetModelsList extends ServiceCallGET<string[]> {
	constructor(type: string) {
		super(`models-list/${type}`, undefined, undefined, false);
	}
}
