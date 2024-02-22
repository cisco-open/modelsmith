import { AlgorithmKey } from '../../../../modules/model-compression/models/enums/algorithms.enum';
import { ScriptArguments } from './script-arguments.interface-dto';

export interface ScriptConfigsDto {
	alg?: AlgorithmKey;
	params?: ScriptArguments;
}
