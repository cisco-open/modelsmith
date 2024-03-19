//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { AlgorithmKey, PruningAlgorithmsEnum, QuantizationAlgorithmsEnum } from '../enums/algorithms.enum';

export const PRUNING_ALGORITHMS_LIST: { key: PruningAlgorithmsEnum; value: string }[] = [
	{ key: PruningAlgorithmsEnum.IPG, value: 'GraSP pruning' },
	{ key: PruningAlgorithmsEnum.IPM, value: 'Magnitude-based init pruning' },
	{ key: PruningAlgorithmsEnum.IPR, value: 'Random init pruning' },
	{ key: PruningAlgorithmsEnum.IMP, value: 'Iterative Magnitude Pruning' },
	{ key: PruningAlgorithmsEnum.OMP, value: 'One-shot Magnitude Pruning' },
	{ key: PruningAlgorithmsEnum.IPS, value: 'Init Pruning Snip' },
	{ key: PruningAlgorithmsEnum.IPSY, value: 'Init Pruning Synflow' },
	{ key: PruningAlgorithmsEnum.IPMB, value: 'Init Pruning Magnitude Both' }
];

export const QUANTIZATION_ALGORITHMS_LIST: { key: QuantizationAlgorithmsEnum; value: string }[] = [
	{ key: QuantizationAlgorithmsEnum.BPTQ, value: 'Basic PTQ' },
	{ key: QuantizationAlgorithmsEnum.BRECQ, value: 'Brec-q' },
	{ key: QuantizationAlgorithmsEnum.MINMAXPTQ, value: 'Minmax-ptq' }
];

export const ALL_ALGORITHMS = [...PRUNING_ALGORITHMS_LIST, ...QUANTIZATION_ALGORITHMS_LIST];

export const DEFAULT_SELECTED_ALGORITHM: AlgorithmKey = PruningAlgorithmsEnum.IMP;

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
