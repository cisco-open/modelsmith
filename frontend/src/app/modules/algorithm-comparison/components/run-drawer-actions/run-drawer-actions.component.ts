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

import { AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, filter, skip, take } from 'rxjs';
import { ChartDatasets } from '../../../../services/client/models/charts/chart-data.interface-dto';
import { SummarizedRunRecord } from '../../../../services/client/models/run-records/run-records.interface';
import {
	CustomAPILoadingService,
	RequestsConfigKeyEnum
} from '../../../../services/interceptor/app-loading-interceptor';
import { RunRecordsActions } from '../../../../state/run-records/records';
import { isEmptyObject, isNilOrEmptyString } from '../../../core/utils/core.utils';
import { AlgorithmType } from '../../../model-compression/models/enums/algorithms.enum';
import { DRAWER_DATA, DrawerConfig, DrawerRef, DrawerStatus } from '../../../shared/standalone/ms-drawer';
import { DrawerActionTypeEnum } from '../../../shared/standalone/ms-drawer/models/drawer-action-type.enum';
import { chartColorsSettings } from '../../../shared/standalone/ms-line-chart/models/constants/chart-color-settings.constants';
import { ChartColorEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-color.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { RecordComparisonChartColors, RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';
import { RecordsFacadeService } from '../../services/records-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-run-drawer-actions',
	templateUrl: './run-drawer-actions.component.html',
	styleUrls: ['./run-drawer-actions.component.scss']
})
export class RunDrawerActionsComponent implements OnInit, AfterViewInit {
	@ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
	panelStates: { [key: string]: boolean } = {
		statistics: true,
		parameters: true,
		accuracy: true,
		modelTrainingDetails: true
	};

	form: FormGroup = new FormGroup({});

	algorithmTypeLabel: string = '';

	files: { name: string; disabled: boolean }[] = [];
	summarizedRecord?: SummarizedRunRecord;

	isSummarizedRecordLoading$: Observable<boolean> = this.customAPILoadingService.getLoadingObservableForKey(
		RequestsConfigKeyEnum.RUN_RECORDS_SUMMARIZED_DATA
	);

	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {};

	lastRunAccuracyTestingChartData: ChartDatasets[] = [];

	get chartFormGroup(): FormGroup {
		return this.form.get('chart') as FormGroup;
	}

	get selectRunFormControl(): FormControl {
		return this.form.get('selectRun') as FormControl;
	}

	get runNameFormControl(): FormControl {
		return this.form.get('runName') as FormControl;
	}

	constructor(
		private drawerRef: DrawerRef,
		@Inject(DRAWER_DATA) public drawerConfig: DrawerConfig,
		private fb: FormBuilder,
		private recordsFacadeService: RecordsFacadeService,
		private recordsDataService: RecordsDataService,
		private customAPILoadingService: CustomAPILoadingService
	) {}

	ngAfterViewInit(): void {
		this.restorePanelStates();
	}

	ngOnInit(): void {
		this.initForm();
		this.initChartDisplaySettings();
		this.listenToChartColorChanges();

		this.algorithmTypeLabel = this.getAlgorithmTypeString();

		switch (this.drawerConfig.actionType) {
			case DrawerActionTypeEnum.ADD: {
				this.loadData();
				this.configureAddTypeActions();
				break;
			}
			case DrawerActionTypeEnum.EDIT:
			case DrawerActionTypeEnum.VIEW: {
				this.configureEditOrViewTypeActions();
				break;
			}
		}
	}

	private getAlgorithmTypeString(): string {
		switch (this.recordsDataService.algorithmType) {
			case AlgorithmType.PRUNING:
				return 'pruning';
			case AlgorithmType.QUANTIZATION:
				return 'quantization';
			case AlgorithmType.MACHINE_UNLEARNING:
				return 'machine unlearning';
			default:
				return 'specified';
		}
	}

	private initChartDisplaySettings(): void {
		let xAxisDataPointsCount: number = 0;

		switch (this.recordsDataService.algorithmType) {
			case AlgorithmType.PRUNING: {
				xAxisDataPointsCount = 100;
				break;
			}
			case AlgorithmType.QUANTIZATION: {
				xAxisDataPointsCount = 79;
				break;
			}
			case AlgorithmType.MACHINE_UNLEARNING: {
				xAxisDataPointsCount = 36;
				break;
			}
			default: {
				break;
			}
		}

		this.testingAccuracyChartDisplaySettings = {
			yAxisMinimumValue: 0,
			yAxisTickInterval: 20,
			chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
			xAxisDataPointsCount,
			yAxisMaximumValue: 100,
			isXAxisVisible: true,
			isXAxisDynamic: true,
			areTooltipsEnabled: true,
			xAxisInitialLabelValue: 1,
			xAxisLabelPrefix: 'Step:',
			datasetLabelPrefix: 'Test:',
			isChartWithCustomColorSettings: true,
			customChartColors: { datasetColors: [{ backgroundColor: 'rgba(241, 196, 15, 0.2)', borderColor: '#f1c40f' }] }
		};
	}

	private listenToChartColorChanges() {
		this.chartFormGroup.valueChanges.pipe(debounceTime(300), untilDestroyed(this)).subscribe((chartData) => {
			if (isEmptyObject(chartData)) {
				return;
			}

			const { backgroundColor, borderColor } = chartData;

			this.testingAccuracyChartDisplaySettings = {
				...this.testingAccuracyChartDisplaySettings,
				customChartColors: {
					datasetColors: [{ backgroundColor: backgroundColor, borderColor: borderColor }]
				}
			};

			this.lastRunAccuracyTestingChartData = [...this.lastRunAccuracyTestingChartData];
		});
	}

	private configureEditOrViewTypeActions(): void {
		const { recordName, recordFilename, record, chartColors } = this.drawerConfig.data;
		if (this.drawerConfig.actionType === DrawerActionTypeEnum.VIEW) {
			this.form.disable();
		} else if (this.drawerConfig.actionType === DrawerActionTypeEnum.EDIT) {
			this.selectRunFormControl.disable();
		}

		this.files = [{ name: recordFilename, disabled: true }];
		this.form.patchValue({
			selectRun: recordFilename,
			runName: recordName,
			chart: {
				borderColor: chartColors.borderColor,
				backgroundColor: chartColors.backgroundColor
			}
		});

		this.summarizedRecord = record;
		this.lastRunAccuracyTestingChartData = this.configureChartDataset(record);

		this.testingAccuracyChartDisplaySettings = {
			...this.testingAccuracyChartDisplaySettings,
			hasCustomDatasetsLabels: true,
			customDatasetsLabels: [recordName],
			customChartColors: {
				datasetColors: [
					{
						backgroundColor: chartColors.backgroundColor || 'rgba(241, 196, 15, 0.2)',
						borderColor: chartColors.borderColor || '#f1c40f'
					}
				]
			}
		};
	}

	private configureAddTypeActions(): void {
		this.listenToSelectRunFormValueChanges();
		this.listenToSummarizedRecordChanges();
	}

	private listenToSelectRunFormValueChanges() {
		this.selectRunFormControl.valueChanges
			.pipe(
				untilDestroyed(this),
				filter((filename) => !isNilOrEmptyString(filename))
			)
			.subscribe((filename) => {
				this.runNameFormControl.reset();
				this.recordsFacadeService.dispatch(
					RunRecordsActions.getRunRecordSummarizedData({
						algorithmType: this.recordsDataService.algorithmType,
						filename
					})
				);
			});
	}

	private listenToSummarizedRecordChanges() {
		this.recordsFacadeService.summarizedRecord$
			.pipe(untilDestroyed(this), skip(1))
			.subscribe((record: SummarizedRunRecord) => {
				this.summarizedRecord = record;
				this.lastRunAccuracyTestingChartData = this.configureChartDataset(record);

				const algorithm_key = this.summarizedRecord?.statistics['algorithm_key'];
				const arch = this.summarizedRecord?.parameters['arch'];

				if (!isNilOrEmptyString(algorithm_key) && !isNilOrEmptyString(arch)) {
					this.runNameFormControl.setValue(`${algorithm_key}_${arch}`);
				}

				this.savePanelStates();
				this.restorePanelStates();
			});
	}

	private configureChartDataset(record: SummarizedRunRecord): ChartDatasets[] {
		return [
			{
				datasetIndex: 0,
				values: record.lastRunTestingAccuracyData || []
			}
		] as ChartDatasets[];
	}

	private loadData() {
		this.recordsFacadeService.dispatch(
			RunRecordsActions.getRunRecordsFilenames({ algorithmType: this.recordsDataService.algorithmType })
		);
		this.recordsFacadeService.filenames$.pipe(skip(1), take(1)).subscribe((files: string[]) => {
			const existingFilenames = new Set(this.recordsDataService.records.map((record) => record.recordFilename));
			this.files = files.map((file) => ({
				name: file,
				disabled: existingFilenames.has(file)
			}));
		});
	}

	private initForm() {
		const defaultColors = this.getDefaultChartColors();

		this.form = this.fb.group({
			selectRun: [null, Validators.required],
			runName: [null, Validators.required],
			chart: this.fb.group({
				borderColor: [defaultColors.borderColor, Validators.required],
				backgroundColor: [defaultColors.backgroundColor, Validators.required]
			})
		});
	}

	private getDefaultChartColors() {
		const index = Math.max(this.recordsDataService.records.length, 0);
		const chartColors = chartColorsSettings[ChartColorEnum.YELLOW].datasetColors[index];

		return {
			borderColor: chartColors.borderColor,
			backgroundColor: chartColors.backgroundColor
		};
	}

	save(status: DrawerStatus): void {
		if (status !== DrawerStatus.SAVE) {
			return;
		}

		const { backgroundColor, borderColor } = this.form.get('chart')?.getRawValue();

		this.drawerRef.close({
			result: {
				recordName: this.runNameFormControl.value,
				recordFilename: this.selectRunFormControl.value,
				record: this.summarizedRecord,
				chartColors: {
					backgroundColor: backgroundColor,
					borderColor: borderColor
				} as RecordComparisonChartColors
			} as RecordComparisonItem,
			status
		});
	}

	close() {
		this.drawerRef.close();
	}

	private savePanelStates() {
		this.panels.forEach((panel, index) => {
			this.panelStates[index] = panel.expanded;
		});
	}

	private restorePanelStates() {
		this.panels.forEach((panel, index) => {
			if (this.panelStates[index] !== undefined) {
				panel.expanded = this.panelStates[index];
			}
		});
	}
}
