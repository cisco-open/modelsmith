import { KeyValue } from '../key-value/key-value.interface-dto';

export interface RunRecordsDto {
	parameters: KeyValue<string>;
	statistics: KeyValue<string>;
	modelTrainingDetails: KeyValue<string>;
	messages: any; // TO DEFINE
}
