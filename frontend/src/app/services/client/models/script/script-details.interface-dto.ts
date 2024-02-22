import { AlgorithmKey, AlgorithmType } from '../../../../modules/model-compression/models/enums/algorithms.enum';
import { ActiveParameters } from '../parameters/parameter.interface-dto';

export interface ScriptDetails {
	algKey: AlgorithmKey;
	params: ActiveParameters;
	model: string;
	type: AlgorithmType;
}
