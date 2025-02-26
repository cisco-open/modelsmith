//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	ElementRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Optional,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { delay } from 'rxjs';
import { ChartDatasets } from '../../../../services/client/models/charts/chart-data.interface-dto';
import { ScriptFacadeService } from '../../../core/services/script-facade.service';
import { isScriptActive } from '../../../model-compression/models/enums/script-status.enum';
import { isEmptyObject } from '../../shared.utils';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	DEFAULT_UPDATE_INTERVAL_VALUE,
	DEFAULT_Y_AXIS_GROWTH_OFFSET,
	DEFAULT_Y_AXIS_GROWTH_ROUND_FACTOR
} from './models/constants/chart.constants';
import { ChartDataStructure, ChartDisplaySettings } from './models/interfaces/ms-chart-display-settings.interface';
import { ChartToolsGlobalSignalsService } from './services/chart-tools-global-signals.service';
import { ChartWebsocketService } from './services/chart-websocket.service';
import { ChartSettingsUtils } from './utils/charts-settings.utils';

// Enhanced Features:
// - Dynamic Auto-Growing yAxis: When the line approaches the MAX minus the yAxisChartOffsetDynamicGrow, the yAxis automatically expands for better visibility.
// - Real-Time yAxis Updates: The chart updates in real time in response to yAxis changes.
// - Zoom Functionality with Panning: Users can zoom in for detailed views and pan across the chart.
// - Interactive Tooltips: Tooltips provide additional information on hover, enhancing user interaction.

@Component({
	selector: 'ms-line-chart',
	templateUrl: './ms-line-chart.component.html',
	styleUrls: ['./ms-line-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgChartsModule],
	providers: [ChartWebsocketService]
})
export class MsLineChartComponent implements OnInit, OnChanges, OnDestroy {
	@Input() data: ChartDatasets[] = [];
	@Input() settings!: ChartDisplaySettings;

	private latestValuesToUpdate: { datasetIndex: number; value: number }[] = [];
	private updateIntervalId: any;

	@ViewChild(BaseChartDirective, { static: true }) chart?: BaseChartDirective;
	@ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

	public lineChartData!: ChartConfiguration['data'];
	public lineChartOptions!: ChartConfiguration['options'];
	public lineChartType: ChartType = 'line';

	public isScriptActive: boolean = false;
	private maxY: number = 0;

	constructor(
		private destroyRef: DestroyRef,
		private scriptFacadeService: ScriptFacadeService,
		@Optional() private chartToolsGlobalSignalsService: ChartToolsGlobalSignalsService,
		private chartWebsocketService: ChartWebsocketService
	) {}

	ngOnInit() {
		this.registerPlugins();
		this.listenToScriptStateChanges();
		this.listenToToolsSignals();

		this.listenToChartWebsocketEvents();
	}

	private listenToChartWebsocketEvents() {
		this.chartWebsocketService.latestValuesToUpdate.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((update) => {
			this.addLatestValueToChart(update.datasetIndex, update.value);
		});

		this.chartWebsocketService.enhanceXAxis
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((reconstructionIndex) => {
				if (this.settings.enhanceSinglePhaseXAxisWebsocketEvent) {
					this.enhanceSinglePhaseXAxis(reconstructionIndex);
				}
			});
	}

	private registerPlugins(): void {
		ChartSettingsUtils.registerZoomPlugin();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['settings'] && changes['settings'].currentValue) {
			this.stopAutoUpdate();
			this.startAutoUpdate();

			this.initializeChartSettings();
			this.chartWebsocketService.initializeWebSocket(this.settings?.realtimeUpdateMetric);
		}
		if (changes['data'] && changes['data'].currentValue) {
			this.prependNewChartData(changes['data'].currentValue);
		}
	}

	private listenToToolsSignals() {
		if (!this.chartToolsGlobalSignalsService) {
			return;
		}

		// Tooltips
		this.chartToolsGlobalSignalsService.toggleTooltips$
			.pipe(delay(100), takeUntilDestroyed(this.destroyRef))
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
			.pipe(delay(100), takeUntilDestroyed(this.destroyRef))
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
		this.scriptFacadeService.scriptStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
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
		this.lineChartOptions = ChartSettingsUtils.configureChartOptions(this.settings);
		this.updateChartSettingsBasedOnScriptState();

		const xAxisAvailableWidth = this.chartContainer.nativeElement.offsetWidth;

		switch (this.settings?.chartDataStructure) {
			case ChartDataStructure.SINGLE_PHASE_X_AXIS: {
				this.lineChartData = ChartSettingsUtils.prepareSinglePhaseChartDataStructure(
					this.settings,
					xAxisAvailableWidth
				);

				break;
			}
			case ChartDataStructure.SINGLE_PHASE_X_AXIS_SKIP_ONE: {
				this.lineChartData = ChartSettingsUtils.prepareSinglePhaseSkipOneChartDataStructure(
					this.settings,
					xAxisAvailableWidth
				);
				break;
			}
			case ChartDataStructure.MULTI_PHASE_X_AXIS: {
				this.lineChartData = ChartSettingsUtils.prepareChartDataStructure(this.settings);
				break;
			}
			default:
				break;
		}

		this.chart?.update();
	}

	private enhanceSinglePhaseXAxis(reconstructionIndex: number) {
		if (!this.settings.isXAxisDynamic) {
			return;
		}

		const newLabel = `${this.settings.xAxisLabelPrefix} ${reconstructionIndex}`;
		if (this.lineChartData.labels?.includes(newLabel)) {
			return;
		}

		this.lineChartData.labels?.push(newLabel);
		this.chart?.update();
	}

	private prependNewChartData(chartDatasets: ChartDatasets[]) {
		if (isEmptyObject(this.lineChartData)) {
			return;
		}

		chartDatasets.forEach((chartDataset: ChartDatasets) => {
			const datasetIndex = chartDataset.datasetIndex;
			this.ensureDatasetLength(datasetIndex);

			const dataset = this.lineChartData.datasets[datasetIndex];
			dataset.data = [...chartDataset.values, ...dataset.data];
		});

		if (this.settings?.isYAxisDynamic) {
			const allDataPoints = chartDatasets.flatMap((dataset) => dataset.values);
			this.updateDynamicYAxis(allDataPoints);
		}

		this.chart?.update();
	}

	private startAutoUpdate() {
		if (!this.isScriptActive || isEmptyObject(this.settings)) {
			return;
		}

		this.settings.updateInterval = DEFAULT_UPDATE_INTERVAL_VALUE;

		const updateInterval = Number(this.settings.updateInterval);
		if (updateInterval <= 0) {
			console.warn('Invalid update interval. Auto update will not start.');
			return;
		}

		if (this.updateIntervalId !== undefined) {
			clearInterval(this.updateIntervalId);
		}

		this.updateIntervalId = setInterval(() => {
			this.refreshChartData();
		}, updateInterval);
	}

	private refreshChartData() {
		try {
			if (!this.latestValuesToUpdate.length) return;

			this.latestValuesToUpdate.forEach((update) => {
				this.ensureDatasetLength(update.datasetIndex);

				const dataset = this.lineChartData.datasets[update.datasetIndex];
				dataset.data.push(update.value);
			});

			if (this.settings?.isYAxisDynamic) {
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
		while (index >= this.lineChartData?.datasets?.length) {
			this.lineChartData.datasets.push(
				ChartSettingsUtils.initializeDatasetTemplate(this.lineChartData.datasets.length, this.settings)
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

	private resetLocalChartSettings(): void {
		if (!this.chartToolsGlobalSignalsService) {
			return;
		}

		this.chartToolsGlobalSignalsService.toggleTooltips = false;
		this.chartToolsGlobalSignalsService.toggleZoom = false;
	}

	ngOnDestroy(): void {
		this.resetLocalChartSettings();
		this.stopAutoUpdate();
	}
}
