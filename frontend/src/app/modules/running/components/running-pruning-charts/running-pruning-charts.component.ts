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
import { ChartColorEnum } from '../../../shared/models/enums/chart-color.enum';
import { ChartTypeEnum } from '../../../shared/models/enums/chart-type.enum';
import { RealtimeUpdateMetricEnum } from '../../../shared/models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings,
	DEFAULT_NR_OF_STEPS_PER_EPOCH,
	DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH,
	DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS
} from '../../../shared/models/interfaces/ms-chart-display-settings.interface';
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
	lossChartDisplaySettings: ChartDisplaySettings = {};

	initialLossTestingChartData: ChartDatasets[] = [];
	testingLossChartDisplaySettings: ChartDisplaySettings = {};

	// Accuracy
	initialAccuracyChartData: ChartDatasets[] = [];
	accuracyPruningChartSettings: ChartConfigurationSettings = {};
	accuracyChartDisplaySettings: ChartDisplaySettings = {};

	initialAccuracyTestingChartData: ChartDatasets[] = [];
	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {};

	// Sparsity
	initialSparsityChartData: ChartDatasets[] = [];
	sparsityPruningChartSettings: ChartConfigurationSettings = {};
	sparsityChartDisplaySettings: ChartDisplaySettings = {};

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
					...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_EPOCH,
					xAxisRepetitionCount: Number(this.accuracyPruningChartSettings.epochs),
					yAxisMaximumValue: 100,
					zoomRangeLimits: {
						max: 100
					},
					datasetColorSettingsKey: ChartColorEnum.GREEN
				};
				this.testingAccuracyChartDisplaySettings = {
					...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
					yAxisTickInterval: 20,
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH,
					xAxisRepetitionCount: Number(this.accuracyPruningChartSettings.epochs),
					yAxisMaximumValue: 100,
					zoomRangeLimits: {
						max: 100
					},
					datasetColorSettingsKey: ChartColorEnum.YELLOW
				};

				this.lossPruningChartSettings = {
					...(settings[ChartTypeEnum.LOSS_PRUNING] || ({} as ChartConfigurationSettings)),
					testingSteps: DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH
				};
				this.lossChartDisplaySettings = {
					...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
					yAxisMinimumValue: 0,
					yAxisTickInterval: 2,
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_EPOCH,
					xAxisRepetitionCount: Number(this.lossPruningChartSettings.epochs),
					isYAxisDynamic: true,
					dynamicYAxisGrowthOffset: 2,
					datasetColorSettingsKey: ChartColorEnum.RED
				};
				this.testingLossChartDisplaySettings = {
					...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
					yAxisMinimumValue: 0,
					yAxisTickInterval: 2,
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: DEFAULT_NR_OF_STEPS_PER_TRAINING_EPOCH,
					xAxisRepetitionCount: Number(this.lossPruningChartSettings.epochs),
					isYAxisDynamic: true,
					dynamicYAxisGrowthOffset: 2,
					datasetColorSettingsKey: ChartColorEnum.YELLOW
				};

				this.sparsityPruningChartSettings = {
					...(settings[ChartTypeEnum.SPARSITY_PRUNING] || ({} as ChartConfigurationSettings))
				} as ChartConfigurationSettings;

				this.sparsityChartDisplaySettings = {
					...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
					xAxisLabelPrefix: 'Pruning',
					isDatasetLabelVisible: false,
					yAxisTickInterval: 100,
					chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS_SKIP_ONE,
					xAxisDataPointsCount: this.sparsityPruningChartSettings.pruningTimes! + 1,
					zoomRangeLimits: {
						max: 100
					},
					datasetColorSettingsKey: ChartColorEnum.BLUE
				};
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

		this.chartsFacadeService.dispatch(ChartActions.getCurrentPruningChartData());
	}
}
