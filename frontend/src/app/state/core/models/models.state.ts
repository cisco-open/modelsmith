import { ModelDto } from '../../../services/client/models/models/models.interface-dto';

export interface ModelsState {
	quantizationModels?: ModelDto[];
	pruningModels?: ModelDto[];
	machineUnlearningModels?: ModelDto[];
	currentModel?: string;
	error?: any;
}
