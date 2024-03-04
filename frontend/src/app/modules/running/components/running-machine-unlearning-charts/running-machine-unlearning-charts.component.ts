import { Component } from '@angular/core';
import { filter, skip, take } from 'rxjs';
import {
	ChartDatasets,
	MachineUnlearningProgress
} from '../../../../services/client/models/charts/chart-data.interface-dto';
import {
	ChartConfigurationSettings,
	ChartConfigurationSettingsDictionary
} from '../../../../services/client/models/charts/chart-settings.interface-dto';
import { ChartActions } from '../../../../state/core/charts';
import { ChartsFacadeService } from '../../../core/services/charts-facade.service';
import { isEmptyObject } from '../../../core/utils/core.utils';
import { ChartColorEnum } from '../../../shared/models/enums/chart-color.enum';
import { ChartTypeEnum } from '../../../shared/models/enums/chart-type.enum';
import { RealtimeUpdateMetricEnum } from '../../../shared/models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/models/interfaces/ms-chart-display-settings.interface';
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
	accuracyMachineUnlearningChartSettings: ChartConfigurationSettings = {};
	accuracyChartDisplaySettings: ChartDisplaySettings = {};

	// Accuracy Testing
	initialAccuracyTestingChartData: ChartDatasets[] = [];
	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {};

	// Loss
	initialLossChartData: ChartDatasets[] = [];
	lossMachineUnlearningChartSettings: ChartConfigurationSettings = {};
	lossChartDisplaySettings: ChartDisplaySettings = {};

	// Loss Testing
	initialLossTestingChartData: ChartDatasets[] = [];
	testingLossChartDisplaySettings: ChartDisplaySettings = {};

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

				this.accuracyMachineUnlearningChartSettings =
					settings[ChartTypeEnum.ACCURACY_MACHINE_UNLEARNING] || ({} as ChartConfigurationSettings);

				this.accuracyChartDisplaySettings = {
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: 159,
					isXAxisVisible: false,
					datasetLabelPrefix: 'Epoch:',
					xAxisRepetitionCount: 1,
					yAxisMinimumValue: 0,
					yAxisMaximumValue: 100,
					zoomRangeLimits: {
						max: 100
					},
					datasetColorSettingsKey: ChartColorEnum.GREEN
				};

				this.testingAccuracyChartDisplaySettings = {
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: 159,
					isXAxisVisible: false,
					datasetLabelPrefix: 'Test:',
					xAxisRepetitionCount: 1,
					yAxisMinimumValue: 0,
					yAxisMaximumValue: 100,
					zoomRangeLimits: {
						max: 100
					},
					datasetColorSettingsKey: ChartColorEnum.YELLOW
				};

				this.lossMachineUnlearningChartSettings =
					settings[ChartTypeEnum.LOSS_MACHINE_UNLEARNING] || ({} as ChartConfigurationSettings);

				this.lossChartDisplaySettings = {
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: 159,
					isXAxisVisible: false,
					datasetLabelPrefix: 'Epoch:',
					xAxisRepetitionCount: 1,
					yAxisMinimumValue: 0,
					isYAxisDynamic: true,
					datasetColorSettingsKey: ChartColorEnum.RED
				};

				this.testingLossChartDisplaySettings = {
					chartDataStructure: ChartDataStructure.MUlTI_PHASE_X_AXIS,
					xAxisDataPointsCount: 159,
					isXAxisVisible: false,
					datasetLabelPrefix: 'Test:',
					xAxisRepetitionCount: 1,
					yAxisMinimumValue: 0,
					isYAxisDynamic: true,
					dynamicYAxisGrowthOffset: 1,
					dynamicYAxisGrowthRoundFactor: 2,
					datasetColorSettingsKey: ChartColorEnum.YELLOW
				};

				this.chartsFacadeService.dispatch(ChartActions.getCurrentMachineUnlearningChartData());
			});

		this.chartsFacadeService.dispatch(
			ChartActions.getChartConfigurationSettings({
				chartTypes: [ChartTypeEnum.ACCURACY_MACHINE_UNLEARNING, ChartTypeEnum.LOSS_MACHINE_UNLEARNING]
			})
		);
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
