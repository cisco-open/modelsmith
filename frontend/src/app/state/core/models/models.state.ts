export interface ModelsState {
	quantizationModels?: string[];
	pruningModels?: string[];
	machineUnlearningModels?: string[];
	currentModel?: string;
	error?: any;
}
