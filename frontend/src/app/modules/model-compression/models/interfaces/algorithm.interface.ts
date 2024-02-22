import { AlgorithmType, PruningAlgorithmsEnum, QuantizationAlgorithmsEnum } from '../enums/algorithms.enum';

export interface Algorithm<T> {
	key: T;
	value: string;
	type: AlgorithmType;
}

export interface PruningAlgorithm extends Algorithm<PruningAlgorithmsEnum> {
	type: AlgorithmType.PRUNING;
}

export interface QuantizationAlgorithm extends Algorithm<QuantizationAlgorithmsEnum> {
	type: AlgorithmType.QUANTIZATION;
}
