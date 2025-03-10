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

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../core/components/ms-drawer';
import { DrawerActionTypeEnum } from '../../../core/components/ms-drawer/models/enums/drawer-action-type.enum';
import { AlgorithmType } from '../../../model-compression/models/enums/algorithms.enum';
import { RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';
import { RunDrawerActionsComponent } from '../run-drawer-actions/run-drawer-actions.component';

@Component({
	selector: 'ms-algorithm-comparison',
	templateUrl: './algorithm-comparison.component.html',
	styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent implements OnInit {
	form: FormGroup = new FormGroup({});
	private destroyRef = inject(DestroyRef);

	readonly algorithmTypesOptions = [
		{
			key: AlgorithmType.QUANTIZATION,
			value: 'Quantization'
		},
		{
			key: AlgorithmType.PRUNING,
			value: 'Pruning'
		},
		{
			key: AlgorithmType.MACHINE_UNLEARNING,
			value: 'Machine Unlearning'
		}
	];

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
			actionType: DrawerActionTypeEnum.ADD,
			width: '40vw'
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
		this.algorithmTypeFormControl.valueChanges
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((algorithmType: AlgorithmType) => {
				this.recordsDataService.algorithmType = algorithmType;
			});
	}
}
