import { ParametersDto } from '../../models/parameters/parameter.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetParameters extends ServiceCallGET<ParametersDto[]> {
	constructor(alg: string) {
		super(`/parameters/${alg}`, undefined, undefined, false);

		if (this.mock) {
			this.url += '/get-response-body-200.json';
		}
	}
}
