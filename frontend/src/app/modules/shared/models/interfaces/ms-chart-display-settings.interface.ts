import { ChartColorEnum } from '../enums/chart-color.enum';

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
}

export const DEFAULT_Y_AXIS_GROWTH_OFFSET = 5;
export const DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR = 5;
export const DEFAULT_DATASET_COLOR_SETTINGS_KEY = ChartColorEnum.GREEN;

export const DEFAULT_NR_OF_STEPS_PER_EPOCH = 390;
export const DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH = 99;
export const DEFAULT_TOTAL_EPOCHS_NR = 2;

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
