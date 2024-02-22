import { Component } from '@angular/core';
import { filter, skip, take } from 'rxjs';
import {
	ChartDatasets,
	QuantizationProgress
} from '../../../../services/client/models/charts/chart-data.interface-dto';
import { ChartActions } from '../../../../state/core/charts';
import { ChartsFacadeService } from '../../../core/services/charts-facade.service';
import { ChartColorEnum } from '../../../shared/models/enums/chart-color.enum';
import { RealtimeUpdateMetricEnum } from '../../../shared/models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/models/interfaces/ms-chart-display-settings.interface';
import { MetricType, mapQuantizationTestingData, mapReconstructionData } from '../../utils/process-charts-data.utils';

@Component({
	selector: 'ms-running-quantization-charts',
	templateUrl: './running-quantization-charts.component.html',
	styleUrls: ['./running-quantization-charts.component.scss']
})
export class RunningQuantizationChartsComponent {
	RealtimeUpdateMetric: typeof RealtimeUpdateMetricEnum = RealtimeUpdateMetricEnum;

	initialLossChartData: ChartDatasets[] = [];
	initialLossTestingChartData: ChartDatasets[] = [];
	initialAccuracyChartData: ChartDatasets[] = [];
	initialAccuracyTestingChartData: ChartDatasets[] = [];

	lossChartDisplaySettings: ChartDisplaySettings = {
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 40,
		datasetLabelPrefix: 'Reconstruction:',
		xAxisLabelPrefix: 'Step',
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		isXAxisVisible: false,
		isYAxisDynamic: true,
		dynamicYAxisGrowthOffset: 50,
		datasetColorSettingsKey: ChartColorEnum.RED
	};

	lossTestingChartDisplaySettings: ChartDisplaySettings = {
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 79,
		isDatasetLabelVisible: false,
		xAxisLabelPrefix: 'Step',
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		isXAxisVisible: false,
		isYAxisDynamic: true,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		dynamicYAxisGrowthRoundFactor: 2
	};

	accuracyChartDisplaySettings: ChartDisplaySettings = {
		yAxisMaximumValue: 100,
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 10,
		datasetLabelPrefix: 'Reconstruction:',
		xAxisLabelPrefix: 'Recon.',
		isDatasetLabelVisible: false,
		isXAxisVisible: true,
		xAxisInitialLabelValue: 0,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.GREEN
	};

	accuracyTestingChartDisplaySettings: ChartDisplaySettings = {
		yAxisMaximumValue: 100,
		yAxisMinimumValue: 0,
		xAxisDataPointsCount: 79,
		isDatasetLabelVisible: false,
		xAxisLabelPrefix: 'Step',
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		isXAxisVisible: false,
		zoomRangeLimits: {
			max: 100
		},
		datasetColorSettingsKey: ChartColorEnum.YELLOW
	};

	constructor(private chartsFacadeService: ChartsFacadeService) {}

	ngOnInit(): void {
		this.loadLatestChartsData();
	}

	private loadLatestChartsData(): void {
		this.chartsFacadeService.quantizationProgress$
			.pipe(
				skip(1),
				filter((data): data is QuantizationProgress => !!data),
				take(1)
			)
			.subscribe((data) => this.processChartData(data));

		this.chartsFacadeService.dispatch(ChartActions.getCurrentQuantizationChartData());
	}

	private processChartData(data: QuantizationProgress): void {
		this.initialLossChartData = mapReconstructionData(data.reconstructions, MetricType.LOSS);
		this.initialAccuracyChartData = mapReconstructionData(data.reconstructions, MetricType.ACCURACY);
		this.initialLossTestingChartData = mapQuantizationTestingData(data.testing, MetricType.LOSS);
		this.initialAccuracyTestingChartData = mapQuantizationTestingData(data.testing, MetricType.ACCURACY);
	}
}
