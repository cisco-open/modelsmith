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
import { filter, skip, take } from 'rxjs';
import { ChartDatasets } from '../../../../services/client/models/charts/chart-data.interface-dto';
import { SummarizedRunRecord } from '../../../../services/client/models/run-records/run-records.interface';
import { RunRecordsActions } from '../../../../state/run-records/records';
import { isNilOrEmptyString } from '../../../core/utils/core.utils';
import { AlgorithmType } from '../../../model-compression/models/enums/algorithms.enum';
import { DRAWER_DATA, DrawerConfig, DrawerRef, DrawerStatus } from '../../../shared/standalone/ms-drawer';
import { DrawerActionTypeEnum } from '../../../shared/standalone/ms-drawer/models/drawer-action-type.enum';
import { ChartColorEnum } from '../../../shared/standalone/ms-line-chart/models/enums/chart-color.enum';
import {
	ChartDataStructure,
	ChartDisplaySettings,
	DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS
} from '../../../shared/standalone/ms-line-chart/models/interfaces/ms-chart-display-settings.interface';
import { RecordComparissonItem } from '../../models/record-comparisson.interface';
import { RecordsFacadeService } from '../../services/records-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-run-drawer-actions',
	templateUrl: './run-drawer-actions.component.html',
	styleUrls: ['./run-drawer-actions.component.scss']
})
export class RunDrawerActionsComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	files: string[] = [];
	summarizedRecord?: SummarizedRunRecord;

	testingAccuracyChartDisplaySettings: ChartDisplaySettings = {
		...DEFAULT_PRUNING_CHART_DISPLAY_SETTINGS,
		yAxisTickInterval: 20,
		chartDataStructure: ChartDataStructure.SINGLE_PHASE_X_AXIS,
		xAxisDataPointsCount: 100,
		yAxisMaximumValue: 100,
		datasetColorSettingsKey: ChartColorEnum.YELLOW,
		isXAxisVisible: false,
		isTooltipsToolEnables: true
	};

	lastRunAccuracyTestingChartData: ChartDatasets[] = [];

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
		private recordsFacadeService: RecordsFacadeService
	) {}

	ngOnInit(): void {
		this.initForm();

		switch (this.drawerConfig.actionType) {
			case DrawerActionTypeEnum.ADD: {
				this.loadData();
				this.configureAddTypeActions();
				break;
			}
			case DrawerActionTypeEnum.VIEW: {
				this.configureViewTypeActions();
				break;
			}
		}
	}

	private configureViewTypeActions(): void {
		this.form.disable();

		const { recordName, recordFilename, record } = this.drawerConfig.data;

		this.files = [recordFilename];
		this.selectRunFormControl.patchValue(recordFilename);
		this.runNameFormControl.patchValue(recordName);

		this.summarizedRecord = record;
		this.lastRunAccuracyTestingChartData = this.configureChartDataset(record);
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
		this.recordsFacadeService.filenames$.pipe(skip(1), take(1)).subscribe((files: string[]) => (this.files = files));
	}

	private initForm() {
		this.form = this.fb.group({
			selectRun: [null, Validators.required],
			runName: [null, Validators.required]
		});
	}

	save(status: DrawerStatus): void {
		if (status !== DrawerStatus.SAVE) {
			return;
		}

		this.drawerRef.close({
			result: {
				recordName: this.runNameFormControl.value,
				recordFilename: this.selectRunFormControl.value,
				record: this.summarizedRecord
			} as RecordComparissonItem,
			status
		});
	}

	close() {
		this.drawerRef.close();
	}
}
