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

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter, skip, take } from 'rxjs';
import { ChartDatasets, PruningProgress } from '../../../../services/client/models/charts/chart-data.interface-dto';
import {
	ChartConfigurationSettings,
	ChartConfigurationSettingsDictionary
} from '../../../../services/client/models/charts/chart-settings.interface-dto';
import { ChartActions } from '../../../../state/core/charts';
import { ChartsFacadeService } from '../../../core/services/charts-facade.service';

import {
	DEFAULT_NR_OF_STEPS_PER_EPOCH,
	DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH,
	DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS
} from '../../../shared/standalone/ms-line-chart/models/constants/chart.constants';
import { ChartColorEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-color.enum';
import { ChartTypeEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-type.enum';
import { RealtimeUpdateMetricEnum } from '../../../shared/standalone/ms-line-chart/models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { MetricType, mapPruningChartData, mapSparsityChartData } from '../../utils/process-charts-data.utils';

@UntilDestroy()
@Component({
	selector: 'ms-running-pruning-charts',
	templateUrl: './running-pruning-charts.component.html',
	styleUrls: ['./running-pruning-charts.component.scss']
})
export class RunningPruningChartsComponent implements OnInit {
	RealtimeUpdateMetric: typeof RealtimeUpdateMetricEnum = RealtimeUpdateMetricEnum;

	// Loss
	initialLossChartData: ChartDatasets[] = [];
	lossPruningChartSettings: ChartConfigurationSettings = {};
	lossChartDisplaySettings: ChartDisplaySettings = {
		...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
		yAxisMinimumValue: 0,
		yAxisTickInterval: 2,
		chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
		xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_EPOCH,
		isYAxisDynamic: true,
		dynamicYAxisGrowthOffset: 2,
		datasetColorSettingsKey: ChartColorEnum.RED,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.LOSS
	};

	initialLossTestingChartData: ChartDatasets[] = [];
	testingLossChartDisplaySettings: ChartDisplaySettings = {
		...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
		yAxisMinimumValue: 0,
		yAxisTickInterval: 2,
		chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
		xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH,
		isYAxisDynamic: true,
		dynamicYAxisGrowthOffset: 2,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.TESTING_LOSS
	};

	// Accuracy
	initialAccuracyChartData: ChartDatasets[] = [];
	accuracyPruningChartSettings: ChartConfigurationSettings = {};
	accuracyChartDisplaySettings: ChartDisplaySettings = {
		...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
		chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
		xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_EPOCH,
		yAxisMaximumValue: 100,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.GREEN,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.ACCURACY
	};

	initialAccuracyTestingChartData: ChartDatasets[] = [];
	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {
		...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
		yAxisTickInterval: 20,
		chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
		xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH,
		yAxisMaximumValue: 100,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.TESTING_ACCURACY
	};

	// Sparsity
	initialSparsityChartData: ChartDatasets[] = [];
	sparsityPruningChartSettings: ChartConfigurationSettings = {};
	sparsityChartDisplaySettings: ChartDisplaySettings = {
		...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
		xAxisLabelPrefix: 'Pruning',
		isDatasetLabelVisible: false,
		yAxisTickInterval: 100,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS_SKIP_ONE,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.BLUE,
		useSteppedLines: true,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.SPARSITY
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

				this.accuracyPruningChartSettings =
					settings[ChartTypeEnum.ACCURACY_PRUNING] || ({} as ChartConfigurationSettings);
				this.accuracyChartDisplaySettings = {
					...this.accuracyChartDisplaySettings,
					xAxisRepetitionCount: Number(this.accuracyPruningChartSettings.epochs)
				};
				this.testingAccuracyChartDisplaySettings = {
					...this.testingAccuracyChartDisplaySettings,
					xAxisRepetitionCount: Number(this.accuracyPruningChartSettings.epochs)
				};

				this.lossPruningChartSettings = {
					...(settings[ChartTypeEnum.LOSS_PRUNING] || ({} as ChartConfigurationSettings)),
					testingSteps: DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH
				};
				this.lossChartDisplaySettings = {
					...this.lossChartDisplaySettings,
					xAxisRepetitionCount: Number(this.lossPruningChartSettings.epochs)
				};
				this.testingLossChartDisplaySettings = {
					...this.testingLossChartDisplaySettings,
					xAxisRepetitionCount: Number(this.lossPruningChartSettings.epochs)
				};

				this.sparsityPruningChartSettings = {
					...(settings[ChartTypeEnum.SPARSITY_PRUNING] || ({} as ChartConfigurationSettings))
				} as ChartConfigurationSettings;
				this.sparsityChartDisplaySettings = {
					...this.sparsityChartDisplaySettings,
					xAxisDataPointsCount: this.sparsityPruningChartSettings.pruningTimes! + 1
				};

				this.chartsFacadeService.dispatch(ChartActions.getCurrentPruningChartData());
			});

		this.chartsFacadeService.dispatch(
			ChartActions.getChartConfigurationSettings({
				chartTypes: [ChartTypeEnum.ACCURACY_PRUNING, ChartTypeEnum.LOSS_PRUNING, ChartTypeEnum.SPARSITY_PRUNING]
			})
		);
	}

	private loadLatestChartsData(): void {
		this.chartsFacadeService.pruningProgress
			.pipe(
				skip(1),
				filter((data): data is PruningProgress[] => !!data && data.length > 0),
				take(1)
			)
			.subscribe((data: PruningProgress[]) => {
				this.initialLossChartData = mapPruningChartData(data, MetricType.LOSS);
				this.initialLossTestingChartData = mapPruningChartData(data, MetricType.LOSS, true);
				this.initialAccuracyChartData = mapPruningChartData(data, MetricType.ACCURACY);
				this.initialAccuracyTestingChartData = mapPruningChartData(data, MetricType.ACCURACY, true);
				this.initialSparsityChartData = mapSparsityChartData(data);
			});
	}
}
