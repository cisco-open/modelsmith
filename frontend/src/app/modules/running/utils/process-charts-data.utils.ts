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

import {
	ChartDatasets,
	MachineUnlearningProgress,
	PruningProgress,
	QuantizationReconstruction,
	QuantizationTestProgress
} from '../../../services/client/models/charts/chart-data.interface-dto';

export enum MetricType {
	ACCURACY = 'accuracy',
	LOSS = 'loss'
}

export const DEFAUlT_FIRST_SPARSITY_VALUE = 100;

export const mapPruningChartData = (
	data: PruningProgress[],
	dataType: MetricType,
	isTestingData: boolean = false
): ChartDatasets[] => {
	return data.map((status) => ({
		datasetIndex: status.datasetIndex,
		values: (isTestingData ? status.testing : status.steps).map((step) => step[dataType]) || []
	})) as ChartDatasets[];
};

export const mapSparsityChartData = (data: PruningProgress[]): ChartDatasets[] => {
	const allSparsityValues = data
		.flatMap((status) => status.sparsity)
		.filter((value) => value !== null && value !== undefined);

	return [
		{
			datasetIndex: 0,
			values: [DEFAUlT_FIRST_SPARSITY_VALUE, ...allSparsityValues]
		}
	];
};

export const mapQuantizationTestingData = (
	testing: QuantizationTestProgress,
	dataType: MetricType
): ChartDatasets[] => {
	return [
		{
			datasetIndex: 0,
			values: testing.steps.map((step) => step[dataType]).filter((value) => value !== null && value !== undefined)
		}
	] as ChartDatasets[];
};

export const mapReconstructionData = (
	reconstructions: QuantizationReconstruction[],
	dataType: MetricType
): ChartDatasets[] => {
	if (dataType === MetricType.LOSS) {
		return reconstructions.map((reconstruction, index) => ({
			datasetIndex: index,
			values: reconstruction.steps.map((step) => step?.loss).filter((value) => value !== null && value !== undefined)
		})) as ChartDatasets[];
	} else {
		return [
			{
				datasetIndex: 0,
				values: reconstructions
					.map((reconstruction) => reconstruction.accuracy)
					.filter((value) => value !== null && value !== undefined)
			}
		] as ChartDatasets[];
	}
};

export const mapMachineUnlearningData = (data: MachineUnlearningProgress, metric: MetricType): ChartDatasets[] => {
	return data.epochs.map((progress, index) => ({
		datasetIndex: index,
		values: progress.steps.map((step) => step[metric])
	})) as ChartDatasets[];
};

export const mapMachineUnlearningTestingData = (
	data: MachineUnlearningProgress,
	metric: MetricType
): ChartDatasets[] => {
	return data.tests.map((progress, index) => ({
		datasetIndex: index,
		values: progress.steps.map((step) => step[metric])
	})) as ChartDatasets[];
};
