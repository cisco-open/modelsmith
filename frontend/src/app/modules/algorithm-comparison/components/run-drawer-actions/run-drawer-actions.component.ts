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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import {
	ChartDataStructure,
	ChartDisplaySettings
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { rgbaToColor } from '../../../shared/standalone/ms-line-chart/utils/chart-functions.utils';
import { RecordComparisonChartColors, RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';
import { RecordsFacadeService } from '../../services/records-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-run-drawer-actions',
	templateUrl: './run-drawer-actions.component.html',
	styleUrls: ['./run-drawer-actions.component.scss']
})
export class RunDrawerActionsComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	files: { name: string; disabled: boolean }[] = [];
	summarizedRecord?: SummarizedRunRecord;

	isSummarizedRecordLoading$: Observable<boolean> = this.customAPILoadingService.getLoadingObservableForKey(
		RequestsConfigKeyEnum.RUN_RECORDS_SUMMARIZED_DATA
	);

	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {
		yAxisMinimumValue: 0,
		yAxisTickInterval: 20,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 100,
		yAxisMaximumValue: 100,
		isXAxisVisible: false,
		areTooltipsEnabled: true,
		xAxisLabelPrefix: 'Step:',
		datasetLabelPrefix: 'Test:',
		isChartWithCustomColorSettings: true,
		customChartColors: { datasetColors: [{ backgroundColor: 'rgba(241, 196, 15, 0.2)', borderColor: '#f1c40f' }] }
	};

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

	ngOnInit(): void {
		this.initForm();
		this.listenToChartColorChanges();

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

	private listenToChartColorChanges() {
		this.chartFormGroup.valueChanges.pipe(debounceTime(300), untilDestroyed(this)).subscribe((chartData) => {
			if (isEmptyObject(chartData)) {
				return;
			}

			const { backgroundColor, borderColor } = chartData;
			const { rgba: backgroundColorValue } = backgroundColor;
			const { rgba: borderColorValue } = borderColor;

			this.testingAccuracyChartDisplaySettings = {
				...this.testingAccuracyChartDisplaySettings,
				customChartColors: {
					datasetColors: [{ backgroundColor: backgroundColorValue, borderColor: borderColorValue }]
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
			this.chartFormGroup.enable();
		}

		this.files = [{ name: recordFilename, disabled: true }];
		this.form.patchValue({
			selectRun: recordFilename,
			runName: recordName,
			chart: {
				borderColor: rgbaToColor(chartColors.borderColor),
				backgroundColor: rgbaToColor(chartColors.backgroundColor)
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
		this.chartFormGroup.valueChanges
			.pipe(
				untilDestroyed(this),
				filter((filename) => !isNilOrEmptyString(filename))
			)
			.subscribe((filename) => {
				this.runNameFormControl.reset();
				this.recordsFacadeService.dispatch(
					RunRecordsActions.getRunRecordSummarizedData({ algorithmType: AlgorithmType.PRUNING, filename })
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
			RunRecordsActions.getRunRecordsFilenames({ algorithmType: AlgorithmType.PRUNING })
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
		this.form = this.fb.group({
			selectRun: [null, Validators.required],
			runName: [null, Validators.required],
			chart: this.fb.group({
				borderColor: [rgbaToColor('rgba(241, 196, 15, 1)'), Validators.required],
				backgroundColor: [rgbaToColor('rgba(241, 196, 15, 0.2)'), Validators.required]
			})
		});
	}

	save(status: DrawerStatus): void {
		if (status !== DrawerStatus.SAVE) {
			return;
		}

		const { backgroundColor, borderColor } = this.form.get('chart')?.getRawValue();
		const { rgba: backgroundColorValue } = backgroundColor;
		const { rgba: borderColorValue } = borderColor;

		this.drawerRef.close({
			result: {
				recordName: this.runNameFormControl.value,
				recordFilename: this.chartFormGroup.value,
				record: this.summarizedRecord,
				chartColors: {
					backgroundColor: backgroundColorValue,
					borderColor: borderColorValue
				} as RecordComparisonChartColors
			} as RecordComparisonItem,
			status
		});
	}

	close() {
		this.drawerRef.close();
	}
}
