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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartDatasets } from '../../../../services/client/models/charts/chart-data.interface-dto';
import { ChartColorEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-color.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { RecordComparissonItem } from '../../models/record-comparisson.interface';
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
		yAxisTickInterval: 20,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 100,
		yAxisMaximumValue: 100,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		isXAxisVisible: false,
		areTooltipsEnabled: true,
		xAxisLabelPrefix: 'Step:',
		hasCustomDatasetsLabels: true
	};

	lastRunsAccuracyTestingChartData: ChartDatasets[] = [];

	constructor(public recordsDataService: RecordsDataService) {}

	ngOnInit() {
		this.listenToRecordsChanges();
	}

	listenToRecordsChanges(): void {
		this.recordsDataService.records$.pipe(untilDestroyed(this)).subscribe((records: RecordComparissonItem[]) => {
			this.lastRunsAccuracyTestingChartData = this.configureChartDatasets(records);

			this.testingAccuracyChartDisplaySettings = {
				...this.testingAccuracyChartDisplaySettings,
				customDatasetsLabels: records.map((record) => record.recordName)
			};
		});
	}

	private configureChartDatasets(records: RecordComparissonItem[]): ChartDatasets[] {
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
}