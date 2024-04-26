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

import { Chart, ChartConfiguration } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { chartColorsSettings } from '../models/constants/chart-color-settings.constants';
import {
	ChartDisplaySettings,
	DEFAULT_DATASET_COLOR_SETTINGS_KEY,
	DEFAULT_NR_OF_STEPS_PER_EPOCH,
	DEFAULT_TOTAL_EPOCHS_NR
} from '../models/interfaces/ms-chart-display-settings.interface';

export class ChartUtils {
	static registerZoomPlugin() {
		Chart.register(zoomPlugin);
	}

	static createXAxisLabels(totalEpochs: number, totalSteps: number, displaySettings: ChartDisplaySettings): string[] {
		return Array.from({ length: totalEpochs * totalSteps }, (_, index) =>
			index % totalSteps === 0 ? `${displaySettings?.xAxisLabelPrefix} ${index / totalSteps}` : ''
		);
	}

	static createSinglePhaseAxisLabels(length: number, displaySettings: ChartDisplaySettings): string[] {
		const startingNumber = displaySettings.xAxisInitialLabelValue ?? 1; // Default to 1 if not provided
		return Array.from({ length }, (_, i) => `${displaySettings?.xAxisLabelPrefix} ${i + startingNumber}`);
	}

	static createSinglePhaseSkipOneAxisLabels(length: number, displaySettings: ChartDisplaySettings): string[] {
		return Array.from({ length }, (_, i) => (i === 0 ? '' : `${displaySettings?.xAxisLabelPrefix} ${i - 1}`));
	}

	static configureChartOptions(settings: ChartDisplaySettings): ChartConfiguration['options'] {
		return {
			responsive: true,
			maintainAspectRatio: false,
			animation: {
				duration: 0
			},
			scales: {
				y: {
					display: true,
					min: settings.yAxisMinimumValue,
					max: settings.yAxisMaximumValue,
					ticks: {
						display: settings.isYAxisVisible,
						stepSize: settings.yAxisTickInterval
					}
				},
				x: {
					display: settings.isXAxisVisible,
					type: 'category',
					ticks: {
						autoSkip: false
					},
					grid: {
						drawOnChartArea: true,
						color: (context) => {
							return context.tick && context.tick.label !== '' ? 'rgba(225, 228, 232, 1)' : 'transparent';
						},
						lineWidth: 1,
						tickLength: 10
					},
					border: {
						display: true,
						width: 1,
						color: 'rgba(225, 228, 232, 1)',
						dash: [],
						dashOffset: 0
					}
				}
			},
			plugins: {
				tooltip: {
					mode: 'index',
					intersect: false,
					enabled: settings.isTooltipsToolEnables
				},
				legend: {
					display: settings.isDatasetLabelVisible
				},
				zoom: {
					pan: {
						mode: 'xy'
					},
					limits: {
						y: {
							min: settings?.zoomRangeLimits?.min || 0,
							max: settings?.zoomRangeLimits?.max || undefined
						},
						x: {
							min: 0
						}
					}
				}
			}
		};
	}

	static prepareSinglePhaseChartDataStructure(
		length: number,
		displaySettings: ChartDisplaySettings
	): ChartConfiguration['data'] {
		return {
			datasets: [],
			labels: this.createSinglePhaseAxisLabels(length, displaySettings)
		};
	}

	static prepareSinglePhaseSkipOneChartDataStructure(
		length: number,
		displaySettings: ChartDisplaySettings
	): ChartConfiguration['data'] {
		return {
			datasets: [],
			labels: this.createSinglePhaseSkipOneAxisLabels(length, displaySettings)
		};
	}

	static prepareChartDataStructure(
		totalEpochs: number = DEFAULT_TOTAL_EPOCHS_NR,
		totalSteps: number = DEFAULT_NR_OF_STEPS_PER_EPOCH,
		displaySettings: ChartDisplaySettings
	): ChartConfiguration['data'] {
		return {
			datasets: [],
			labels: this.createXAxisLabels(totalEpochs, totalSteps, displaySettings)
		};
	}

	static initializeDatasetTemplate(datasetCount: number, displaySettings: ChartDisplaySettings) {
		const typeSettings =
			chartColorsSettings[displaySettings?.datasetColorSettingsKey || DEFAULT_DATASET_COLOR_SETTINGS_KEY];
		const colorSetting = typeSettings.datasetColors?.[datasetCount % typeSettings.datasetColors.length] || {
			borderColor: 'black',
			backgroundColor: 'white'
		};

		return {
			label: `${displaySettings?.datasetLabelPrefix || ''} ${datasetCount}`,
			data: [],
			borderColor: colorSetting.borderColor,
			backgroundColor: colorSetting.backgroundColor,
			fill: 'origin',
			pointRadius: 0,
			pointHoverRadius: 0,
			pointBackgroundColor: colorSetting.borderColor,
			pointHoverBackgroundColor: colorSetting.borderColor,
			pointHoverBorderColor: colorSetting.borderColor,
			stepped: displaySettings.useSteppedLines || false
		};
	}
}
