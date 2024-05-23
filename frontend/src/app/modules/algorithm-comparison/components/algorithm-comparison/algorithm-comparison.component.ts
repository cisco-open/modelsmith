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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { KeyValueObject } from '../../../../services/client/models/key-value/key-value.interface-dto';
import { AlgorithmType, AlgorithmTypeKeyValue } from '../../../model-compression/models/enums/algorithms.enum';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../shared/standalone/ms-drawer';
import { DrawerActionTypeEnum } from '../../../shared/standalone/ms-drawer/models/drawer-action-type.enum';
import { RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';
import { RunDrawerActionsComponent } from '../run-drawer-actions/run-drawer-actions.component';

@UntilDestroy()
@Component({
	selector: 'ms-algorithm-comparison',
	templateUrl: './algorithm-comparison.component.html',
	styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	readonly algorithmTypesOptions = AlgorithmTypeKeyValue.filter((option) => option.key !== AlgorithmType.TRAIN);
	readonly ALGORITHM_TYPE_CONTROL_NAME = 'algorithmType';

	get algorithmTypeFormControl(): FormControl {
		return this.form.get(this.ALGORITHM_TYPE_CONTROL_NAME) as FormControl;
	}

	constructor(
		private drawerService: DrawerService,
		public recordsDataService: RecordsDataService,
		private fb: FormBuilder
	) {}

	openAddRunDrawer() {
		const drawerRef = this.drawerService.open(RunDrawerActionsComponent, {
			title: 'Add Run',
			saveButtonLabel: 'Add',
			showCloseButton: true,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.ADD
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((draweCloseEvent: DrawerClose<RecordComparisonItem>) => {
				const { status } = draweCloseEvent;
				if (status === DrawerStatus.DISMISS || status === DrawerStatus.CLOSE) {
					return;
				}

				const { result } = draweCloseEvent;
				this.recordsDataService.addRecord(result as RecordComparisonItem);
			});
	}

	ngOnInit(): void {
		this.initForm();
		this.listenToAlgorithmTypeChanges();
	}

	private initForm() {
		this.form = this.fb.group({
			[this.ALGORITHM_TYPE_CONTROL_NAME]: [this.recordsDataService.algorithmType, Validators.required]
		});
	}

	private listenToAlgorithmTypeChanges() {
		this.algorithmTypeFormControl.valueChanges.pipe(untilDestroyed(this)).subscribe((algorithmType: AlgorithmType) => {
			this.recordsDataService.algorithmType = algorithmType;
		});
	}

	trackByAlgorithmType(_: number, algorithmType: KeyValueObject<string>): any {
		return algorithmType.key;
	}
}
