import { PruningAlgorithmsEnum, QuantizationAlgorithmsEnum } from '../enums/algorithms.enum';

export const PRUNING_ALGORITHMS_LIST: { key: PruningAlgorithmsEnum; value: string }[] = [
	{ key: PruningAlgorithmsEnum.IPG, value: 'GraSP pruning' },
	{ key: PruningAlgorithmsEnum.IPM, value: 'Magnitude-based init pruning' },
	{ key: PruningAlgorithmsEnum.IPR, value: 'Random init pruning' },
	{ key: PruningAlgorithmsEnum.IMP, value: 'Iterative Magnitude Pruning' },
	{ key: PruningAlgorithmsEnum.OMP, value: 'One-shot Magnitude Pruning' },
	{ key: PruningAlgorithmsEnum.IPS, value: 'Init Pruning Snip' },
	{ key: PruningAlgorithmsEnum.IPSY, value: 'Init Pruning Synflow' }
];

export const QUANTIZATION_ALGORITHMS_LIST: { key: QuantizationAlgorithmsEnum; value: string }[] = [
	{ key: QuantizationAlgorithmsEnum.BPTQ, value: 'Basic PTQ' },
	{ key: QuantizationAlgorithmsEnum.BRECQ, value: 'Brec-q' },
	{ key: QuantizationAlgorithmsEnum.MINMAXPTQ, value: 'Minmax-ptq' }
];

export const ALL_ALGORITHMS = [...PRUNING_ALGORITHMS_LIST, ...QUANTIZATION_ALGORITHMS_LIST];

export const DEFAULT_SELECTED_ALGORITHM = PruningAlgorithmsEnum.IMP;

export const getSpecificAlgorithmOptions = (keys: string[]): string[] => {
	return ALL_ALGORITHMS.filter((algorithm) => keys.includes(algorithm.key)).map((algorithm) => algorithm.value);
};

export const findAlgorithmKeyBasedOnValue = (
	description: string
): PruningAlgorithmsEnum | QuantizationAlgorithmsEnum | null => {
	const pruningAlgorithm = PRUNING_ALGORITHMS_LIST.find((algo) => algo.value === description);
	if (pruningAlgorithm) {
		return pruningAlgorithm.key;
	}
	const quantizationAlgorithm = QUANTIZATION_ALGORITHMS_LIST.find((algo) => algo.value === description);
	if (quantizationAlgorithm) {
		return quantizationAlgorithm.key;
	}
	return null;
};
