import { KeyValue } from '../key-value/key-value.interface-dto';

export interface SummarizedRunRecord {
	parameters: KeyValue<string>;
	statistics: KeyValue<string>;
	modelTrainingDetails: KeyValue<string>;
	lastRunTestingAccuracyData: number[];
}
