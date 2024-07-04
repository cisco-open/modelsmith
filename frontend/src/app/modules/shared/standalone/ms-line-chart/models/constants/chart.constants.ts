import { ChartColorEnum } from '../enums/chart-color.enum';
import { ChartDisplaySettings } from '../interfaces/ms-chart-display-settings.interface';

export const DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS: ChartDisplaySettings = {
	isXAxisVisible: true,
	isYAxisVisible: true,
	xAxisLabelPrefix: 'Epoch:',
	datasetLabelPrefix: 'Pruning:',
	yAxisMinimumValue: 0,
	yAxisTickInterval: 20,
	datasetColorSettingsKey: ChartColorEnum.GREEN
};

export const DEFAULT_UPDATE_INTERVAL_VALUE: number = 500;

export const DEFAULT_Y_AXIS_GROWTH_OFFSET: number = 5;
export const DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR: number = 5;
export const DEFAULT_DATASET_COLOR_SETTINGS_KEY: ChartColorEnum = ChartColorEnum.GREEN;

export const DEFAULT_NR_OF_STEPS_PER_EPOCH: number = 391;
export const DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH: number = 100;
export const DEFAULT_TOTAL_EPOCHS_NR: number = 2;
