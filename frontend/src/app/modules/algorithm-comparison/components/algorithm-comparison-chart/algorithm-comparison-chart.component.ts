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
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartDatasets } from '../../../../services/client/models/charts/chart-data.interface-dto';
import { isEmptyArray } from '../../../core/utils/core.utils';
import { ChartColorEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-color.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { ChartToolsGlobalSignalsService } from '../../../shared/standalone/ms-line-chart/services/chart-tools-global-signals.service';
import { RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';

@UntilDestroy()
@Component({
	selector: 'ms-algorithm-comparison-chart',
	templateUrl: './algorithm-comparison-chart.component.html',
	styleUrls: ['./algorithm-comparison-chart.component.scss']
})
export class AlgorithmComparisonChartComponent {
	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {
		yAxisMinimumValue: 0,
		yAxisMaximumValue: 100,
		yAxisTickInterval: 20,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		isXAxisVisible: true,
		xAxisLabelPrefix: 'Step:',
		zoomRangeLimits: {
			min: 0,
			max: 100
		},
		isXAxisDynamic: true,
		hasCustomDatasetsLabels: true
	};

	lastRunsAccuracyTestingChartData: ChartDatasets[] = [];

	enableTooltips = false;
	enableZoom = false;

	constructor(
		public recordsDataService: RecordsDataService,
		private chartToolsGlobalSignalsService: ChartToolsGlobalSignalsService
	) {}

	ngOnInit() {
		this.listenToRecordsChanges();
		this.subscribeToChartToolsSignals();
	}

	listenToRecordsChanges(): void {
		this.recordsDataService.records$.pipe(untilDestroyed(this)).subscribe((records: RecordComparisonItem[]) => {
			if (isEmptyArray(records)) {
				return;
			}

			this.lastRunsAccuracyTestingChartData = this.configureChartDatasets(records);

			this.testingAccuracyChartDisplaySettings = {
				...this.testingAccuracyChartDisplaySettings,
				customDatasetsLabels: records.map((record) => record.recordName),
				xAxisDataPointsCount: records[0].record.lastRunTestingAccuracyData.length,
				isChartWithCustomColorSettings: true,
				customChartColors: {
					datasetColors: records.map((record) => record.chartColors)
				}
			};
		});
	}

	subscribeToChartToolsSignals(): void {
		this.chartToolsGlobalSignalsService.toggleTooltips$.pipe(untilDestroyed(this)).subscribe((value: boolean) => {
			this.enableTooltips = value;
		});

		this.chartToolsGlobalSignalsService.toggleZoom$.pipe(untilDestroyed(this)).subscribe((value: boolean) => {
			this.enableZoom = value;
		});
	}

	private configureChartDatasets(records: RecordComparisonItem[]): ChartDatasets[] {
		const datasets: ChartDatasets[] = [];

		records.forEach((item, index) => {
			const { record } = item;
			datasets.push({
				datasetIndex: index,
				values: record.lastRunTestingAccuracyData || []
			});
		});

		return datasets;
	}

	toggleTooltip(tooltip: MatSlideToggleChange): void {
		this.chartToolsGlobalSignalsService.toggleTooltips = tooltip.checked;
	}

	toggleZoom(zoom: MatSlideToggleChange): void {
		this.chartToolsGlobalSignalsService.toggleZoom = zoom.checked;
	}
}
