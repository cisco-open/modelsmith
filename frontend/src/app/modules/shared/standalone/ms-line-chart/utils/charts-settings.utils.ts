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
import { isEmptyObject } from '../../../../core/utils/core.utils';
import { chartColorsSettings } from '../models/constants/chart-color-settings.constants';
import {
	DEFAULT_DATASET_COLOR_SETTINGS_KEY,
	DEFAULT_NR_OF_STEPS_PER_EPOCH,
	DEFAULT_TOTAL_EPOCHS_NR
} from '../models/constants/chart.constants';
import { ChartDisplaySettings } from '../models/interfaces/ms-chart-display-settings.interface';

export class ChartSettingsUtils {
	static registerZoomPlugin() {
		Chart.register(zoomPlugin);
	}

	static createXAxisLabels(totalEpochs: number, totalSteps: number, displaySettings: ChartDisplaySettings): string[] {
		const density = displaySettings.xAxisLabelDensity || 1;
		return Array.from({ length: totalEpochs * totalSteps }, (_, index) =>
			index % (totalSteps * density) === 0 ? `${displaySettings?.xAxisLabelPrefix || ''} ${index / totalSteps}` : ''
		);
	}

	static createSinglePhaseAxisLabels(length: number, displaySettings: ChartDisplaySettings): string[] {
		const density = displaySettings.xAxisLabelDensity || 1;
		const startingNumber = displaySettings.xAxisInitialLabelValue ?? 1;
		return Array.from({ length }, (_, i) =>
			i % density === 0 ? `${displaySettings?.xAxisLabelPrefix || ''} ${i + startingNumber}` : ''
		);
	}

	static createSinglePhaseSkipOneAxisLabels(length: number, displaySettings: ChartDisplaySettings): string[] {
		const density = displaySettings.xAxisLabelDensity || 1;
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
							const labelIndex = item.dataIndex;
							return `${settings?.xAxisLabelPrefix} ${labelIndex}`;
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

		const sampleLabel = `${settings?.xAxisLabelPrefix || ''} ${startingNumber + maxIndex}`;
		const labelWidth = this.calculateLabelWidth(sampleLabel, chart);
		const maxLabels = Math.floor(availableWidth / labelWidth);
		const totalDataPoints = maxIndex - minIndex + 1;
		const density = Math.max(1, Math.ceil(totalDataPoints / maxLabels));

		const labels = Array.from({ length: chart?.data?.labels!.length }, (_, i) => {
			if (i < minIndex || i > maxIndex) {
				return '';
			}
			return i % density === 0 ? `${settings?.xAxisLabelPrefix || ''} ${startingNumber + i}` : '';
		});

		chart.data.labels = labels;
		chart.update('none');
	}

	static calculateLabelWidth(label: string, chart: Chart): number {
		const ctx = chart.ctx;
		ctx.save();
		ctx.font = ctx.font;
		const labelWidth = ctx.measureText(label).width;
		ctx.restore();
		return labelWidth;
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
