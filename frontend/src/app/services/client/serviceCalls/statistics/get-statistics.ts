import { KeyValue } from '../../models/key-value/key-value.interface-dto';
import { ServiceCallGET } from '../service-call';

export class GetStatistics extends ServiceCallGET<KeyValue<string>> {
	constructor() {
		super(`statistics`, undefined, undefined, false);
	}
}
