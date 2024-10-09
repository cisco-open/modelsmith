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

import { Component } from '@angular/core';
import { filter, skip, take } from 'rxjs';
import {
	ChartDatasets,
	MachineUnlearningProgress
} from '../../../../services/client/models/charts/chart-data.interface-dto';
import { ChartActions } from '../../../../state/core/charts';
import { ChartsFacadeService } from '../../../core/services/charts-facade.service';
import { isEmptyObject } from '../../../shared/shared.utils';

import { ChartColorEnum } from '../../../shared/components/ms-line-chart/models/enums/chart-color.enum';
import { RealtimeUpdateMetricEnum } from '../../../shared/components/ms-line-chart/models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/components/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import {
	MetricType,
	mapMachineUnlearningData,
	mapMachineUnlearningTestingData
} from '../../utils/process-charts-data.utils';

@Component({
	selector: 'ms-running-machine-unlearning-charts',
	templateUrl: './running-machine-unlearning-charts.component.html',
	styleUrls: ['./running-machine-unlearning-charts.component.scss']
})
export class RunningMachineUnlearningChartsComponent {
	RealtimeUpdateMetric: typeof RealtimeUpdateMetricEnum = RealtimeUpdateMetricEnum;

	// Accuracy
	initialAccuracyChartData: ChartDatasets[] = [];
	accuracyChartDisplaySettings: ChartDisplaySettings = {
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 159,
		isXAxisDynamic: true,
		datasetLabelPrefix: 'Epoch:',
		xAxisLabelPrefix: 'Step',
		xAxisRepetitionCount: 1,
		yAxisMinimumValue: 0,
		yAxisMaximumValue: 100,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.GREEN,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.ACCURACY
	};

	// Accuracy Testing
	initialAccuracyTestingChartData: ChartDatasets[] = [];
	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 159,
		isXAxisVisible: true,
		isXAxisDynamic: true,
		xAxisLabelPrefix: 'Step',
		datasetLabelPrefix: 'Test:',
		xAxisRepetitionCount: 1,
		yAxisMinimumValue: 0,
		yAxisMaximumValue: 100,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.TESTING_ACCURACY
	};

	// Loss
	initialLossChartData: ChartDatasets[] = [];
	lossChartDisplaySettings: ChartDisplaySettings = {
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 159,
		isXAxisVisible: true,
		isXAxisDynamic: true,
		xAxisLabelPrefix: 'Step',
		datasetLabelPrefix: 'Epoch:',
		xAxisRepetitionCount: 1,
		yAxisMinimumValue: 0,
		isYAxisDynamic: true,
		datasetColorSettingsKey: ChartColorEnum.RED,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.LOSS
	};

	// Loss Testing
	initialLossTestingChartData: ChartDatasets[] = [];
	testingLossChartDisplaySettings: ChartDisplaySettings = {
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 159,
		isXAxisVisible: true,
		isXAxisDynamic: true,
		xAxisLabelPrefix: 'Step',
		datasetLabelPrefix: 'Test:',
		xAxisRepetitionCount: 1,
		yAxisMinimumValue: 0,
		isYAxisDynamic: true,
		dynamicYAxisGrowthOffset: 1,
		dynamicYAxisGrowthRoundFactor: 2,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		realtimeUpdateMetric: RealtimeUpdateMetricEnum.TESTING_LOSS
	};

	constructor(private chartsFacadeService: ChartsFacadeService) {}

	ngOnInit(): void {
		this.loadChartSettings();
		this.loadLatestChartsData();
	}

	private loadChartSettings() {
		this.chartsFacadeService.dispatch(ChartActions.getCurrentMachineUnlearningChartData());
	}

	private loadLatestChartsData(): void {
		this.chartsFacadeService.machineUnlearningProgress$
			.pipe(
				skip(1),
				filter((data): data is MachineUnlearningProgress => !isEmptyObject(data)),
				take(1)
			)
			.subscribe((data: MachineUnlearningProgress) => {
				this.initialAccuracyChartData = mapMachineUnlearningData(data, MetricType.ACCURACY);
				this.initialLossChartData = mapMachineUnlearningData(data, MetricType.LOSS);

				this.initialAccuracyTestingChartData = mapMachineUnlearningTestingData(data, MetricType.ACCURACY);
				this.initialLossTestingChartData = mapMachineUnlearningTestingData(data, MetricType.LOSS);
			});
	}
}
