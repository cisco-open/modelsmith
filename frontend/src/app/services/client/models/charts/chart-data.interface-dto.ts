export interface PruningProgress {
	datasetIndex: number;
	steps: TrainingStep[];
	testing: TrainingStep[];
	totalSteps: number;
	sparsity: number[];
}

export interface QuantizationProgress {
	reconstructions: QuantizationReconstruction[];
	testing: QuantizationTestProgress;
}

export interface MachineUnlearningProgress {
	epochs: MachineUnlearningEpochs[];
	tests: MachineUnlearningTests[];
}

export interface MachineUnlearningEpochs {
	totalSteps: number;
	steps: TrainingStep[];
}

export interface MachineUnlearningTests {
	totalSteps: number;
	steps: TrainingStep[];
}

export interface QuantizationTestProgress {
	totalSteps: number;
	steps: TrainingStep[];
}

export interface QuantizationReconstruction {
	type: ReconstructionType;
	name: string;
	steps: Partial<TrainingStep[]>;
	totalSteps: number;
	accuracy: number | null;
}

export interface TrainingStep {
	step: number;
	loss?: number;
	accuracy?: number;
}

export interface ChartDatasets {
	datasetIndex: number;
	values: number[];
}

export enum ReconstructionType {
	BLOCK = 'block',
	LAYER = 'layer'
}
