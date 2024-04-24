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

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { skip, take } from 'rxjs';
import { RunRecordsActions } from '../../../../state/run-records/records';
import { AlgorithmType } from '../../../model-compression/models/enums/algorithms.enum';
import { DRAWER_DATA, DrawerConfig, DrawerRef } from '../../../shared/standalone/ms-drawer';
import { RecordsFacadeService } from '../../services/records-facade.service';

@Component({
	selector: 'ms-add-run-drawer',
	templateUrl: './add-run-drawer.component.html',
	styleUrls: ['./add-run-drawer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRunDrawerComponent implements OnInit {
	form: FormGroup = new FormGroup({});

	files: string[] = [];

	constructor(
		private drawerRef: DrawerRef,
		@Inject(DRAWER_DATA) public data: DrawerConfig,
		private fb: FormBuilder,
		private recordsFacadeService: RecordsFacadeService
	) {}

	ngOnInit(): void {
		this.initForm();
		this.loadData();
	}

	private loadData() {
		this.recordsFacadeService.dispatch(RunRecordsActions.getRunRecordsList({ algorithmType: AlgorithmType.PRUNING }));
		this.recordsFacadeService.files$.pipe(skip(1), take(1)).subscribe((files: string[]) => (this.files = files));
	}

	private initForm() {
		this.form = this.fb.group({
			selectRun: [null, Validators.required]
		});
	}

	close() {
		this.drawerRef.close();
	}
}
