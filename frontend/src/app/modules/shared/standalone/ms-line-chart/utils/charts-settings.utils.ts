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
import { isEmptyObject } from '../../../shared.utils';
import { chartColorsSettings } from '../models/constants/chart-color-settings.constants';
import {
	DEFAULT_DATASET_COLOR_SETTINGS_KEY,
	DEFAULT_NR_OF_STEPS_PER_EPOCH,
	DEFAULT_TOTAL_EPOCHS_NR
} from '../models/constants/chart.constants';
import { ChartDataStructure, ChartDisplaySettings } from '../models/interfaces/ms-chart-display-settings.interface';

export const AVERAGE_CHAR_WIDTH: number = 6;

export class ChartSettingsUtils {
	static registerZoomPlugin() {
		Chart.register(zoomPlugin);
	}

	static createXAxisLabels(displaySettings: ChartDisplaySettings): string[] {
		const density = displaySettings.xAxisLabelDensity || 1;
		const totalEpochs: number = displaySettings.xAxisRepetitionCount || DEFAULT_TOTAL_EPOCHS_NR;
		const totalSteps: number = displaySettings.xAxisDataPointsCount || DEFAULT_NR_OF_STEPS_PER_EPOCH;
		return Array.from({ length: totalEpochs * totalSteps }, (_, index) =>
			index % (totalSteps * density) === 0 ? `${displaySettings?.xAxisLabelPrefix || ''} ${index / totalSteps}` : ''
		);
	}

	static createSinglePhaseAxisLabels(displaySettings: ChartDisplaySettings, xAxisAvailableWidth: number): string[] {
		const startingNumber = displaySettings.xAxisInitialLabelValue ?? 1;
		const length = displaySettings.xAxisDataPointsCount ?? 0;
		const highestNumber = length + startingNumber - 1;
		const sampleLabel = `${displaySettings?.xAxisLabelPrefix || ''} ${highestNumber}`;
		const averageCharWidth = AVERAGE_CHAR_WIDTH;
		const labelWidth = sampleLabel.length * averageCharWidth;

		const maxLabels = Math.floor(xAxisAvailableWidth / labelWidth);
		const density = Math.max(1, Math.ceil(length / maxLabels));

		return Array.from({ length }, (_, i) =>
			i % density === 0 ? `${displaySettings?.xAxisLabelPrefix || ''} ${i + startingNumber}` : ''
		);
	}

	static createSinglePhaseSkipOneAxisLabels(
		displaySettings: ChartDisplaySettings,
		xAxisAvailableWidth: number
	): string[] {
		const length = displaySettings.xAxisDataPointsCount || 0;
		const startingNumber = displaySettings.xAxisInitialLabelValue ?? 1;
		const highestNumber = length + startingNumber - 1;
		const sampleLabel = `${displaySettings?.xAxisLabelPrefix || ''} ${highestNumber}`;
		const averageCharWidth = AVERAGE_CHAR_WIDTH;
		const labelWidth = sampleLabel.length * averageCharWidth;

		const maxLabels = Math.floor(xAxisAvailableWidth / labelWidth);
		const density = Math.max(1, Math.ceil(length / maxLabels));

		return Array.from({ length }, (_, i) =>
			i % density === 0 && i !== 0 ? `${displaySettings?.xAxisLabelPrefix || ''} ${i - 1}` : ''
		);
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
					enabled: settings.areTooltipsEnabled,
					callbacks: {
						title: (tooltipItems) => {
							const item = tooltipItems[0];
							const labelIndex = item.dataIndex + 1;
							const prefix = settings.tooltipLabelPrefix || settings.xAxisLabelPrefix || '';
							const maxStepsPerEpoch = settings.xAxisDataPointsCount || 1;

							if (settings.chartDataStructure === ChartDataStructure.MUlTI_PHASE_X_AXIS) {
								const epoch = Math.floor(labelIndex / maxStepsPerEpoch);
								let step = labelIndex % maxStepsPerEpoch;
								if (step === 0 && labelIndex !== 0) {
									step = maxStepsPerEpoch;
								}
								return `${prefix} ${epoch}, Step: ${step}`;
							} else {
								return `${prefix} ${labelIndex}`;
							}
						},
						label: (tooltipItem) => {
							const datasetLabel = tooltipItem?.dataset?.label || '';
							const value = tooltipItem.raw;
							return `${datasetLabel}: ${value}`;
						}
					}
				},
				legend: {
					display: settings.isDatasetLabelVisible
				},
				zoom: {
					pan: {
						mode: 'xy',
						onPan: ({ chart }) => {
							this.dynamicUpdateOfXAxisLabels(chart, settings);
						},
						onPanComplete: ({ chart }) => {
							this.dynamicUpdateOfXAxisLabels(chart, settings);
						}
					},
					limits: {
						y: {
							min: settings?.zoomRangeLimits?.min || 0,
							max: settings?.zoomRangeLimits?.max || undefined
						},
						x: {
							min: 0
						}
					},
					zoom: {
						onZoom: ({ chart }) => {
							this.dynamicUpdateOfXAxisLabels(chart, settings);
						},
						onZoomComplete: ({ chart }) => {
							this.dynamicUpdateOfXAxisLabels(chart, settings);
						}
					}
				}
			}
		};
	}

	static dynamicUpdateOfXAxisLabels(chart: Chart, settings: ChartDisplaySettings): void {
		if (!settings.isXAxisDynamic) {
			return;
		}

		const xScale = chart.scales['x'];
		const minIndex = Math.floor(xScale.min);
		const maxIndex = Math.ceil(xScale.max);
		const availableWidth = chart.width || 0;
		const startingNumber = settings.xAxisInitialLabelValue ?? 1;

		const length = maxIndex - minIndex + 1;
		const highestNumber = length + startingNumber - 1;
		const sampleLabel = `${settings?.xAxisLabelPrefix || ''} ${highestNumber}`;
		const averageCharWidth = AVERAGE_CHAR_WIDTH;
		const labelWidth = sampleLabel.length * averageCharWidth;

		const maxLabels = Math.floor(availableWidth / labelWidth);
		const density = Math.max(1, Math.ceil(length / maxLabels));

		const labels = Array.from({ length: chart?.data?.labels!.length }, (_, i) => {
			if (i < minIndex || i > maxIndex) {
				return '';
			}
			return i % density === 0 ? `${settings?.xAxisLabelPrefix || ''} ${startingNumber + i}` : '';
		});

		chart.data.labels = labels;
		chart.update('none');
	}

	static prepareSinglePhaseChartDataStructure(
		displaySettings: ChartDisplaySettings,
		xAxisAvailableWidth: number
	): ChartConfiguration['data'] {
		return {
			datasets: [],
			labels: this.createSinglePhaseAxisLabels(displaySettings, xAxisAvailableWidth)
		};
	}

	static prepareSinglePhaseSkipOneChartDataStructure(
		displaySettings: ChartDisplaySettings,
		xAxisAvailableWidth: number
	): ChartConfiguration['data'] {
		return {
			datasets: [],
			labels: this.createSinglePhaseSkipOneAxisLabels(displaySettings, xAxisAvailableWidth)
		};
	}

	static prepareChartDataStructure(displaySettings: ChartDisplaySettings): ChartConfiguration['data'] {
		return {
			datasets: [],
			labels: this.createXAxisLabels(displaySettings)
		};
	}

	static initializeDatasetTemplate(datasetCount: number, displaySettings: ChartDisplaySettings) {
		const colorSetting = this.getDatasetColorSetting(datasetCount, displaySettings);
		const label = this.getDatasetLabel(datasetCount, displaySettings);

		return {
			label,
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

	private static getDatasetColorSetting(datasetCount: number, displaySettings: ChartDisplaySettings) {
		const typeSettings = this.determineColorSettings(displaySettings);

		const colors = typeSettings?.datasetColors || [];
		return (
			colors[datasetCount % colors.length] || {
				borderColor: 'black',
				backgroundColor: 'white'
			}
		);
	}

	private static determineColorSettings(displaySettings: ChartDisplaySettings) {
		if (displaySettings.isChartWithCustomColorSettings && !isEmptyObject(displaySettings.customChartColors)) {
			return displaySettings.customChartColors;
		}

		const colorSettingsKey = displaySettings.datasetColorSettingsKey || DEFAULT_DATASET_COLOR_SETTINGS_KEY;
		const typeSettings = chartColorsSettings[colorSettingsKey];

		if (displaySettings.isChartWithCustomColorSettings && isEmptyObject(displaySettings.customChartColors)) {
			console.warn(`No custom chart colors found. Using default settings: ${DEFAULT_DATASET_COLOR_SETTINGS_KEY}`);
		}

		return typeSettings;
	}

	private static getDatasetLabel(datasetCount: number, displaySettings: ChartDisplaySettings): string {
		if (displaySettings.hasCustomDatasetsLabels) {
			return displaySettings?.customDatasetsLabels?.[datasetCount] ?? '';
		} else {
			return `${displaySettings?.datasetLabelPrefix || ''} ${datasetCount}`;
		}
	}
}
