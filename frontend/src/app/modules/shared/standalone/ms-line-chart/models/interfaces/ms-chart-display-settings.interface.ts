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

import { ChartColorEnum } from '../enums/chart-color.enum';
import { RealtimeUpdateMetricEnum } from '../enums/realtime-update-metric.enum';
import { DatasetColors } from './ms-dataset-colors.interface';

export interface ChartDisplaySettings {
	// Determines whether the X-axis should be displayed on the chart.
	isXAxisVisible?: boolean;

	// Determines whether the Y-axis should be displayed on the chart.
	isYAxisVisible?: boolean;

	// Specifies the number of data points on the X-axis.
	// This is particularly useful for defining the length of the axis in a single-phase chart.
	xAxisDataPointsCount?: number;

	// Determines the number of times the X-axis data is repeated.
	// Useful for multi-phase charts where the same X-axis data set needs to be repeated multiple times.
	xAxisRepetitionCount?: number;

	// Starting number for the X-axis labels. This can be used to offset the initial label.
	xAxisInitialLabelValue?: number;

	// Prefix for the labels on the X-axis. This is prepended to each label for clarity and context.
	xAxisLabelPrefix?: string;

	// Prefix for the labels of each dataset. This is useful for distinguishing between different datasets on the chart.
	datasetLabelPrefix?: string;

	// Determines whether the header for the dataset should be shown.
	// This is typically a legend or key that explains what each dataset represents.
	isDatasetLabelVisible?: boolean;

	// The minimum value for the Y-axis. This sets the lower bound of the axis.
	yAxisMinimumValue?: number;

	// The maximum value for the Y-axis. This sets the upper bound of the axis.
	yAxisMaximumValue?: number;

	// The step size between ticks on the Y-axis. This defines the granularity of the Y-axis scale.
	yAxisTickInterval?: number;

	// Defines the data structure for the chart. This could be single-phase, multi-phase, etc.
	// This field dictates how the chart data should be organized and displayed.
	chartDataStructure?: ChartDataStructure;

	// Limits for the zoom functionality on the chart.
	// This includes maximum and minimum zoom levels to control the zoom range.
	zoomRangeLimits?: ChartZoomLimits;

	// Determines whether the Y-axis is dynamic, meaning it can adjust its range based on the data values.
	// This is useful for charts where data values might exceed the initially set Y-axis range.
	isYAxisDynamic?: boolean;

	// The offset added to the Y-axis maximum value when the axis is dynamically growing.
	// This ensures that there's always a margin above the highest data point.
	dynamicYAxisGrowthOffset?: number;

	// The multiple used to adjust the Y-axis maximum value during dynamic growth.
	// This helps in maintaining rounded numbers for the axis range.
	dynamicYAxisGrowthRoundFactor?: number;

	// Key to determine the color scheme for the datasets.
	// This key references an enumeration (ChartColorEnum) which defines various color settings.
	// It is used to apply consistent and meaningful color themes to the chart's datasets,
	// enhancing the visual distinction between different data sets.
	datasetColorSettingsKey?: ChartColorEnum;

	isChartWithCustomColorSettings?: boolean;
	customChartColors?: DatasetColors;

	// Determines whether chart lines should be displayed as stepped lines.
	// When set to true, the chart line segments are rendered as stepped lines.
	useSteppedLines?: boolean;

	// Determines whether the X-axis is dynamic, enabling it to adjust based on the data being displayed.
	// A dynamic X-axis can expand or contract to accommodate varying amounts of data points or to highlight specific data ranges.
	// This is particularly useful for charts that need to adapt to data changes over time, ensuring that the visualization remains clear and informative.
	isXAxisDynamic?: boolean;

	// Determines whether tooltips are enabled for the chart. When set to true, tooltips will appear when hovering over data points,
	// providing additional context or data specifics. This enhances user interaction by allowing users to gain detailed insights into specific data points at a glance.
	areTooltipsEnabled?: boolean;

	// Indicates whether custom labels are used for the X-axis. When true, labels provided in `customAxisLabels` are used instead of default numerical or categorical labels. This is useful for charts that require specific labeling for clarity or emphasis on certain data aspects.
	hasCustomDatasetsLabels?: boolean;

	// An array of custom labels for the X-axis, used when `hasCustomAxisLabels` is true. Each label in this array corresponds to a specific data point on the X-axis, allowing for customized labeling that can include dates, descriptions, or any other contextual information.
	customDatasetsLabels?: string[];

	// Metric used to listen to websocket events for realtime update
	realtimeUpdateMetric?: RealtimeUpdateMetricEnum;

	// Interval based on which to update the chart (optimization, performance trick)
	updateInterval?: number;
}

export const DEFAULT_UPDATE_INTERVAL_VALUE: number = 500;

export const DEFAULT_Y_AXIS_GROWTH_OFFSET: number = 5;
export const DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR: number = 5;
export const DEFAULT_DATASET_COLOR_SETTINGS_KEY: ChartColorEnum = ChartColorEnum.GREEN;

export const DEFAULT_NR_OF_STEPS_PER_EPOCH: number = 390;
export const DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH: number = 99;
export const DEFAULT_TOTAL_EPOCHS_NR: number = 2;

export interface ChartZoomLimits {
	min?: number;
	max?: number;
}

export enum ChartDataStructure {
	SINGLE_PHASE_X_AXIS = 'singlePhase',
	SINGLE_PHASE_X_AXIS_SKIP_ONE = 'singlePhaseXAxisSkipOne',
	MUlTI_PHASE_X_AXIS = 'multiplePhase'
}

export const DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS: ChartDisplaySettings = {
	isXAxisVisible: true,
	isYAxisVisible: true,
	xAxisLabelPrefix: 'Epoch:',
	datasetLabelPrefix: 'Pruning:',
	yAxisMinimumValue: 0,
	yAxisTickInterval: 20,
	datasetColorSettingsKey: ChartColorEnum.GREEN
};
