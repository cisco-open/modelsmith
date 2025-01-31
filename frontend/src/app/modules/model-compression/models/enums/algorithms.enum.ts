//   Copyright 2024 Cisco Systems, Inc.
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
import { toTitleCase } from '../../../shared/shared.utils';

export type AlgorithmKey =
	| PruningAlgorithmsEnum
	| QuantizationAlgorithmsEnum
	| MachineUnlearningAlgorithmsEnum
	| AWQAlgorithmsEnum
	| MultiflowAlgorithmsEnum
	| TrainAlgorithmsEnum
	| DiffusionModelAlgorithmsEnum;

export const AlgorithmType = {
	QUANTIZATION: 'quantization',
	PRUNING: 'pruning',
	MACHINE_UNLEARNING: 'machine_unlearning',
	AWQ: 'awq',
	MULTIFLOW: 'multiflow',
	TRAIN: 'train',
	DIFFUSION_MODEL: 'diffusion_model'
} as const;

export type AlgorithmType = (typeof AlgorithmType)[keyof typeof AlgorithmType];

export const AlgorithmTypeKeyValue: KeyValueObject<string>[] = Object.entries(AlgorithmType).map(([key, value]) => ({
	key: value,
	value: toTitleCase(key)
}));

export const QuantizationAlgorithmsEnum = {
	BPTQ: 'BPTQ',
	BRECQ: 'BRECQ',
	MINMAXPTQ: 'MINMAXPTQ'
} as const;

export type QuantizationAlgorithmsEnum = (typeof QuantizationAlgorithmsEnum)[keyof typeof QuantizationAlgorithmsEnum];

export const MultiflowAlgorithmsEnum = {
	MULTIFLOW_PRUNE: 'MULTIFLOW_PRUNE'
} as const;

export type MultiflowAlgorithmsEnum = (typeof MultiflowAlgorithmsEnum)[keyof typeof MultiflowAlgorithmsEnum];

export const DiffusionModelAlgorithmsEnum = {
	PTQ4DIT_GET_CALIBRATION_SET: 'PTQ4DiT_GET_CALIBRATION_SET',
	PTQ4DIT_QUANT_SAMPLE: 'PTQ4DiT_QUANT_SAMPLE'
} as const;

export type DiffusionModelAlgorithmsEnum =
	(typeof DiffusionModelAlgorithmsEnum)[keyof typeof DiffusionModelAlgorithmsEnum];

export const PruningAlgorithmsEnum = {
	IPG: 'IPG',
	IPM: 'IPM',
	IPR: 'IPR',
	IMP: 'IMP',
	OMP: 'OMP',
	IPS: 'IPS',
	IPSY: 'IPSY',
	IPMB: 'IPMB'
} as const;

export type PruningAlgorithmsEnum = (typeof PruningAlgorithmsEnum)[keyof typeof PruningAlgorithmsEnum];

export const MachineUnlearningAlgorithmsEnum = {
	MU: 'MU'
} as const;

export type MachineUnlearningAlgorithmsEnum =
	(typeof MachineUnlearningAlgorithmsEnum)[keyof typeof MachineUnlearningAlgorithmsEnum];

export const AWQAlgorithmsEnum = {
	AWQ_QUANTIZATION: 'AWQ_Q'
} as const;

export type AWQAlgorithmsEnum = (typeof AWQAlgorithmsEnum)[keyof typeof AWQAlgorithmsEnum];

export const TrainAlgorithmsEnum = {
	QUANTIZATION_TRAIN: 'Q_TRAIN',
	PRUNING_TRAIN: 'P_TRAIN',
	MACHINE_UNLEARNING_TRAIN: 'MU_TRAIN'
} as const;

export type TrainAlgorithmsEnum = (typeof TrainAlgorithmsEnum)[keyof typeof TrainAlgorithmsEnum];

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
	} else if (Object.values(AWQAlgorithmsEnum).includes(algValue as AWQAlgorithmsEnum)) {
		return AlgorithmType.AWQ;
	} else if (Object.values(TrainAlgorithmsEnum).includes(algValue as TrainAlgorithmsEnum)) {
		return AlgorithmType.TRAIN;
	} else if (Object.values(MultiflowAlgorithmsEnum).includes(algValue as MultiflowAlgorithmsEnum)) {
		return AlgorithmType.MULTIFLOW;
	} else if (Object.values(DiffusionModelAlgorithmsEnum).includes(algValue as DiffusionModelAlgorithmsEnum)) {
		return AlgorithmType.DIFFUSION_MODEL;
	}
	return null;
}
