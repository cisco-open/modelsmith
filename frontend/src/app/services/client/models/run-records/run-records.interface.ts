import { KeyValue } from '../key-value/key-value.interface-dto';

export interface SummarizedRunRecordDto {
	parameters: KeyValue<string>;
	statistics: KeyValue<string>;
	modelTrainingDetails: KeyValue<string>;
	lastRunTestingAccuracyData: number[];
}
