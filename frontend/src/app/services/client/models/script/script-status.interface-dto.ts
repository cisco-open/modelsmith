import { ScriptStatusEnum } from '../../../../modules/model-compression/models/enums/script-status.enum';
import { ScriptDetails } from './script-details.interface-dto';

export interface ScriptStatusDto {
	status: ScriptStatusEnum;
	activeScript: ScriptDetails;
}
