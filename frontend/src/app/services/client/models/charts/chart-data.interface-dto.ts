//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

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
