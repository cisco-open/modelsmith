export type AlgorithmKey =
	| PruningAlgorithmsEnum
	| QuantizationAlgorithmsEnum
	| MachineUnlearningAlgorithmsEnum
	| TrainAlgorithmsEnum;

export enum AlgorithmType {
	QUANTIZATION = 'quantization',
	PRUNING = 'pruning',
	MACHINE_UNLEARNING = 'machine_unlearning',
	TRAIN = 'train'
}

export enum QuantizationAlgorithmsEnum {
	BPTQ = 'BPTQ',
	BRECQ = 'BRECQ',
	MINMAXPTQ = 'MINMAXPTQ'
}

export enum PruningAlgorithmsEnum {
	IPG = 'IPG',
	IPM = 'IPM',
	IPR = 'IPR',
	IMP = 'IMP',
	OMP = 'OMP',
	IPS = 'IPS',
	IPSY = 'IPSY'
}

export enum MachineUnlearningAlgorithmsEnum {
	MU = 'MU'
}

export enum TrainAlgorithmsEnum {
	MUT = 'MUT'
}

export function determineAlgorithmType(algValue: string): AlgorithmType | null {
	if (Object.values(PruningAlgorithmsEnum).includes(algValue as PruningAlgorithmsEnum)) {
		return AlgorithmType.PRUNING;
	} else if (Object.values(QuantizationAlgorithmsEnum).includes(algValue as QuantizationAlgorithmsEnum)) {
		return AlgorithmType.QUANTIZATION;
	} else if (Object.values(MachineUnlearningAlgorithmsEnum).includes(algValue as MachineUnlearningAlgorithmsEnum)) {
		return AlgorithmType.MACHINE_UNLEARNING;
	} else if (Object.values(TrainAlgorithmsEnum).includes(algValue as TrainAlgorithmsEnum)) {
		return AlgorithmType.TRAIN;
	}
	return null;
}
