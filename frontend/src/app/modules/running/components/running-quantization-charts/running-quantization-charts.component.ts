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

import { Component } from '@angular/core';
import { filter, skip, take } from 'rxjs';
import {
	ChartDatasets,
	QuantizationProgress
} from '../../../../services/client/models/charts/chart-data.interface-dto';
import { ChartConfigurationSettingsDictionary } from '../../../../services/client/models/charts/chart-settings.interface-dto';
import { ChartActions } from '../../../../state/core/charts';
import { ChartsFacadeService } from '../../../core/services/charts-facade.service';

import { ChartColorEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-color.enum';
import { ChartTypeEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-type.enum';
import { RealtimeUpdateMetricEnum } from '../../../shared/standalone/ms-line-chart/models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { MetricType, mapQuantizationTestingData, mapReconstructionData } from '../../utils/process-charts-data.utils';

@Component({
	selector: 'ms-running-quantization-charts',
	templateUrl: './running-quantization-charts.component.html',
	styleUrls: ['./running-quantization-charts.component.scss']
})
export class RunningQuantizationChartsComponent {
	RealtimeUpdateMetric: typeof RealtimeUpdateMetricEnum = RealtimeUpdateMetricEnum;

	initialLossChartData: ChartDatasets[] = [];
	initialLossTestingChartData: ChartDatasets[] = [];
	initialAccuracyChartData: ChartDatasets[] = [];
	initialAccuracyTestingChartData: ChartDatasets[] = [];

	lossChartDisplaySettings: ChartDisplaySettings = {
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 40,
		datasetLabelPrefix: 'Reconstruction:',
		xAxisLabelPrefix: 'Step',
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		isXAxisVisible: true,
		isXAxisDynamic: true,
		isYAxisDynamic: true,
		dynamicYAxisGrowthOffset: 50,
		datasetColorSettingsKey: ChartColorEnum.RED,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.LOSS
	};

	lossTestingChartDisplaySettings: ChartDisplaySettings = {
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 78,
		isDatasetLabelVisible: false,
		xAxisLabelPrefix: 'Step',
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		isXAxisVisible: true,
		isXAxisDynamic: true,
		isYAxisDynamic: true,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		dynamicYAxisGrowthRoundFactor: 2,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.TESTING_LOSS
	};

	accuracyChartDisplaySettings: ChartDisplaySettings = {
		yAxisMaximumValue: 100,
		yAxisMinimumValue: 0,
		xAxisLabelPrefix: 'Recon.',
		isDatasetLabelVisible: false,
		isXAxisVisible: true,
		xAxisInitialLabelValue: 0,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.GREEN,
		isXAxisDynamic: true,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.ACCURACY
	};

	accuracyTestingChartDisplaySettings: ChartDisplaySettings = {
		yAxisMaximumValue: 100,
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 78,
		isDatasetLabelVisible: false,
		xAxisLabelPrefix: 'Step',
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		isXAxisVisible: true,
		isXAxisDynamic: true,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.TESTING_ACCURACY
	};

	constructor(private chartsFacadeService: ChartsFacadeService) {}

	ngOnInit(): void {
		this.loadChartSettings();
		this.loadLatestChartsData();
	}

	private loadChartSettings() {
		this.chartsFacadeService.settings$
			.pipe(skip(1), take(1))
			.subscribe((settings: ChartConfigurationSettingsDictionary | undefined) => {
				if (!settings) {
					return;
				}

				this.accuracyChartDisplaySettings = {
					...this.accuracyChartDisplaySettings,
					xAxisDataPointsCount: settings[ChartTypeEnum.ACCURACY_QUANTIZATION]?.reconstructions
				};

				this.chartsFacadeService.dispatch(ChartActions.getCurrentQuantizationChartData());
			});

		this.chartsFacadeService.dispatch(
			ChartActions.getChartConfigurationSettings({
				chartTypes: [ChartTypeEnum.ACCURACY_QUANTIZATION]
			})
		);
	}

	private loadLatestChartsData(): void {
		this.chartsFacadeService.quantizationProgress$
			.pipe(
				skip(1),
				filter((data): data is QuantizationProgress => !!data),
				take(1)
			)
			.subscribe((data) => this.processChartData(data));
	}

	private processChartData(data: QuantizationProgress): void {
		this.initialLossChartData = mapReconstructionData(data.reconstructions, MetricType.LOSS);
		this.initialAccuracyChartData = mapReconstructionData(data.reconstructions, MetricType.ACCURACY);
		this.initialLossTestingChartData = mapQuantizationTestingData(data.testing, MetricType.LOSS);
		this.initialAccuracyTestingChartData = mapQuantizationTestingData(data.testing, MetricType.ACCURACY);
	}
}
