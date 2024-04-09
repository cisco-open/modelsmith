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

import { KeyValueObject } from '../../../../services/client/models/key-value/key-value.interface-dto';
import { toTitleCase } from '../../../core/utils/core.utils';

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

export const AlgorithmTypeKeyValue: KeyValueObject<string>[] = Object.entries(AlgorithmType).map(([key, value]) => ({
	key: value,
	value: toTitleCase(key)
}));

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
	IPSY = 'IPSY',
	IPMB = 'IPMB'
}

export enum MachineUnlearningAlgorithmsEnum {
	MU = 'MU'
}

export enum TrainAlgorithmsEnum {
	QUANTIZATION_TRAIN = 'Q_TRAIN',
	PRUNING_TRAIN = 'P_TRAIN',
	MACHINE_UNLEARNING_TRAIN = 'MU_TRAIN'
}

export const AlgorithmTypeTrainAlgoritmMap: any = {
	[AlgorithmType.MACHINE_UNLEARNING]: TrainAlgorithmsEnum.MACHINE_UNLEARNING_TRAIN,
	[AlgorithmType.PRUNING]: TrainAlgorithmsEnum.PRUNING_TRAIN,
	[AlgorithmType.QUANTIZATION]: TrainAlgorithmsEnum.QUANTIZATION_TRAIN
};

export function determineAlgorithmType(algValue: AlgorithmKey): AlgorithmType | null {
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
