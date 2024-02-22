import { ScriptStatusEnum } from '../../../modules/model-compression/models/enums/script-status.enum';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';

export interface ScriptState {
	scriptStatus: ScriptStatusEnum | null;
	scriptDetails: ScriptDetails | null;
	error: any | null;
}
