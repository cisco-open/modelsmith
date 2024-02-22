import { KeyValue } from '../../../services/client/models/key-value/key-value.interface-dto';

export interface StatisticsState {
	statistics: KeyValue<string>;
	error: any | null;
}
