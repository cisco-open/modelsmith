import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { delay } from 'rxjs';
import { ChartDatasets } from '../../../../services/client/models/charts/chart-data.interface-dto';
import { ChartWebsocketMessageTypes } from '../../../core/models/enums/websocket-message-types.enum';
import { ChartsMessages } from '../../../core/models/interfaces/charts-messages.interface';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { WebsocketService } from '../../../core/services/websocket.service';
import { isEmptyObject } from '../../../core/utils/core.utils';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { RealtimeUpdateMetricEnum } from '../../models/enums/realtime-update-metric.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings,
	DEFAULT_Y_AXIS_GROWTH_OFFSET,
	DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR
} from '../../models/interfaces/ms-chart-display-settings.interface';
import { ChartsRealtimeUpdateValues } from '../../models/interfaces/ms-charts-realtime-update-values.interface';
import { ChartToolsGlobalSignalsService } from './services/chart-tools-global-signals.service';
import { ChartUtils } from './utils/charts.utils';

// Enhanced Features:
// - Dynamic Auto-Growing yAxis: When the line approaches the MAX minus the yAxisChartOffsetDynamicGrow, the yAxis automatically expands for better visibility.
// - Real-Time yAxis Updates: The chart updates in real time in response to yAxis changes.
// - Zoom Functionality with Panning: Users can zoom in for detailed views and pan across the chart.
// - Interactive Tooltips: Tooltips provide additional information on hover, enhancing user interaction.

@UntilDestroy()
@Component({
	selector: 'ms-line-chart',
	templateUrl: './ms-line-chart.component.html',
	styleUrls: ['./ms-line-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsLineChartComponent implements OnInit, OnChanges, OnDestroy {
	@Input() data: ChartDatasets[] = [];
	@Input() realtimeUpdateMetric!: RealtimeUpdateMetricEnum;

	@Input() settings!: ChartDisplaySettings;

	private latestValuesToUpdate: { datasetIndex: number; value: number }[] = [];
	@Input() updateInterval: number = 500;
	private updateIntervalId: any;

	@ViewChild(BaseChartDirective) chart?: BaseChartDirective;
	@ViewChild('chartContainer') chartContainer!: ElementRef;

	public lineChartData!: ChartConfiguration['data'];
	public lineChartOptions!: ChartConfiguration['options'];
	public lineChartType: ChartType = 'line';

	public isScriptActive: boolean = false;
	private maxY: number = 0;

	constructor(
		private websocketService: WebsocketService,
		private scriptFacadeService: ScriptFacadeService,
		private chartToolsGlobalSignalsService: ChartToolsGlobalSignalsService
	) {}

	ngOnInit() {
		this.registerPlugins();
		this.listenToScriptStateChanges();
		this.listenToChartWebsocketEvents();
		this.listenToToolsSignals();
	}

	private registerPlugins(): void {
		ChartUtils.registerZoomPlugin();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['settings'] && changes['settings'].currentValue) {
			this.initializeChartSettings();
		}
		if (changes['data'] && changes['data'].currentValue) {
			this.prependNewChartData(changes['data'].currentValue);
		}
	}

	private listenToToolsSignals() {
		// Tooltips
		this.chartToolsGlobalSignalsService.toggleTooltips$
			.pipe(delay(100), untilDestroyed(this))
			.subscribe((enableTooltips: boolean) => {
				if (isEmptyObject(this.lineChartOptions)) {
					return;
				}

				Chart.defaults.plugins.tooltip.enabled = enableTooltips;

				if (this.chart) {
					this.chart.update();
				}
			});

		// Zoom
		this.chartToolsGlobalSignalsService.toggleZoom$
			.pipe(delay(100), untilDestroyed(this))
			.subscribe((enableZoom: boolean) => {
				if (isEmptyObject(this.lineChartOptions)) {
					return;
				}

				Chart.defaults.plugins.zoom.pan!.enabled = enableZoom;
				Chart.defaults.plugins.zoom.zoom!.wheel!.enabled = enableZoom;

				this.updateCursor(enableZoom);

				if (!enableZoom && this.chart) {
					this.chart.chart?.resetZoom();
				}

				if (this.chart) {
					this.chart?.render();
				}
			});
	}

	private updateCursor(enableZoom: boolean): void {
		const action = enableZoom ? 'add' : 'remove';
		this.chartContainer.nativeElement.classList[action]('zoom-cursor');
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);

			if (!this.isScriptActive) {
				this.stopAutoUpdate();
			} else {
				this.startAutoUpdate();
			}

			this.updateChartSettingsBasedOnScriptState();
		});
	}

	private updateChartSettingsBasedOnScriptState(): void {
		let needsUpdate = false;

		if (this.lineChartData && this.lineChartData.datasets) {
			this.lineChartData.datasets.forEach((dataset: any) => {
				dataset.pointHoverRadius = this.isScriptActive ? 0 : 5;
			});
			needsUpdate = true;
		}

		if (needsUpdate) {
			this.chart?.update();
		}
	}

	private initializeChartSettings(): void {
		this.lineChartOptions = ChartUtils.configureChartOptions(this.settings);
		this.updateChartSettingsBasedOnScriptState();

		switch (this.settings?.chartDataStructure) {
			case ChartDataStructure.SINGLE_PHASE_X_AXIS: {
				this.lineChartData = ChartUtils.prepareSinglePhaseChartDataStructure(
					this.settings.xAxisDataPointsCount!,
					this.settings
				);
				break;
			}
			case ChartDataStructure.SINGLE_PHASE_X_AXIS_SKIP_ONE: {
				this.lineChartData = ChartUtils.prepareSinglePhaseSkipOneChartDataStructure(
					this.settings.xAxisDataPointsCount!,
					this.settings
				);
				break;
			}
			case ChartDataStructure.MUlTI_PHASE_X_AXIS: {
				this.lineChartData = ChartUtils.prepareChartDataStructure(
					this.settings.xAxisRepetitionCount,
					this.settings.xAxisDataPointsCount,
					this.settings
				);
				break;
			}
			default:
				break;
		}

		this.chart?.update();
	}

	// Realtime Update Feature based on Websockets
	private listenToChartWebsocketEvents(): void {
		this.websocketService.chartsMessages$.pipe(untilDestroyed(this)).subscribe((message: ChartsMessages) => {
			switch (message.topic) {
				case ChartWebsocketMessageTypes.UPDATE_LATEST_VALUE: {
					const { data } = message;
					const { accuracy, loss, sparsity, datasetIndex } = data as ChartsRealtimeUpdateValues;

					if (accuracy !== undefined && this.realtimeUpdateMetric === RealtimeUpdateMetricEnum.ACCURACY) {
						this.addLatestValueToChart(datasetIndex, accuracy);
					} else if (loss !== undefined && this.realtimeUpdateMetric === RealtimeUpdateMetricEnum.LOSS) {
						this.addLatestValueToChart(datasetIndex, loss);
					} else if (sparsity !== undefined && this.realtimeUpdateMetric === RealtimeUpdateMetricEnum.SPARSITY) {
						this.addLatestValueToChart(0, sparsity);
					}
					break;
				}
				case ChartWebsocketMessageTypes.UPDATE_TESTING:
					const { data } = message;
					const { accuracy, loss, datasetIndex } = data as ChartsRealtimeUpdateValues;

					if (accuracy !== undefined && this.realtimeUpdateMetric === RealtimeUpdateMetricEnum.TESTING_ACCURACY) {
						this.addLatestValueToChart(datasetIndex, accuracy);
					} else if (loss !== undefined && this.realtimeUpdateMetric === RealtimeUpdateMetricEnum.TESTING_LOSS) {
						this.addLatestValueToChart(datasetIndex, loss);
					}
					break;
				default: {
					break;
				}
			}
		});
	}

	private prependNewChartData(chartDatasets: ChartDatasets[]) {
		chartDatasets.forEach((chartDataset: ChartDatasets) => {
			const datasetIndex = chartDataset.datasetIndex;
			this.ensureDatasetLength(datasetIndex);

			const dataset = this.lineChartData.datasets[datasetIndex];
			dataset.data = [...chartDataset.values, ...dataset.data];
		});

		if (this.settings.isYAxisDynamic) {
			const allDataPoints = chartDatasets.flatMap((dataset) => dataset.values);
			this.updateDynamicYAxis(allDataPoints);
		}

		this.chart?.update();
	}

	private startAutoUpdate() {
		if (this.updateInterval <= 0) return;
		this.updateIntervalId = setInterval(() => this.refreshChartData(), this.updateInterval);
	}

	private refreshChartData() {
		try {
			if (!this.latestValuesToUpdate.length) return;

			this.latestValuesToUpdate.forEach((update) => {
				this.ensureDatasetLength(update.datasetIndex);

				const dataset = this.lineChartData.datasets[update.datasetIndex];
				dataset.data.push(update.value);
			});

			if (this.settings.isYAxisDynamic) {
				this.updateDynamicYAxis(this.latestValuesToUpdate.map((update) => update.value));
			}

			this.chart?.update();
			this.latestValuesToUpdate.splice(0, this.latestValuesToUpdate.length);
		} catch (error) {
			console.error('Error updating chart:', error);
		}
	}

	private updateDynamicYAxis(dataset: number[]) {
		if (dataset.length === 0) {
			return;
		}

		const localMaxY = dataset.reduce((max, value) => Math.max(max, value));

		if (localMaxY > this.maxY) {
			this.maxY =
				Math.ceil(
					(localMaxY + (this.settings?.dynamicYAxisGrowthOffset || DEFAULT_Y_AXIS_GROWTH_OFFSET)) /
						(this.settings?.dynamicYAxisGrowthRoundFactor || DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR)
				) * (this.settings?.dynamicYAxisGrowthRoundFactor || DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR);
			this.updateAxisMaxLimits(this.maxY);

			this.chart?.render();
		}
	}

	private updateAxisMaxLimits(maxY: number) {
		if (this.lineChartOptions && this.lineChartOptions.scales) {
			if (this.lineChartOptions.scales['y']) {
				this.lineChartOptions.scales['y'].max = maxY;
			}
		}
	}

	private ensureDatasetLength(index: number): void {
		while (index >= this.lineChartData.datasets.length) {
			this.lineChartData.datasets.push(
				ChartUtils.initializeDatasetTemplate(this.lineChartData.datasets.length, this.settings)
			);
		}
	}

	private addLatestValueToChart(datasetIndex: number, value: number) {
		if (value === null || value === undefined) return;
		this.latestValuesToUpdate.push({ datasetIndex, value });
	}

	private stopAutoUpdate() {
		if (this.updateIntervalId) clearInterval(this.updateIntervalId);
	}

	private resetTools(): void {
		this.chartToolsGlobalSignalsService.toggleTooltips = false;
		this.chartToolsGlobalSignalsService.toggleZoom = false;
	}

	ngOnDestroy(): void {
		this.resetTools();
		this.stopAutoUpdate();
	}
}
