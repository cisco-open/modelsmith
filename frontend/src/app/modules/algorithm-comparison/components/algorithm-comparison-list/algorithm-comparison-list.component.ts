//   Copyright 2024 Cisco Systems, Inc.

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

import { Component } from '@angular/core';
import { take } from 'rxjs';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../shared/components/ms-drawer';
import { DrawerActionTypeEnum } from '../../../shared/components/ms-drawer/models/enums/drawer-action-type.enum';
import { isEmptyObject } from '../../../shared/shared.utils';
import { RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';
import { RunDrawerActionsComponent } from '../run-drawer-actions/run-drawer-actions.component';

@Component({
	selector: 'ms-algorithm-comparison-list',
	templateUrl: './algorithm-comparison-list.component.html',
	styleUrls: ['./algorithm-comparison-list.component.scss']
})
export class AlgorithmComparisonListComponent {
	constructor(
		public recordsDataService: RecordsDataService,
		private drawerService: DrawerService
	) {}

	removeRecord(index: number) {
		this.recordsDataService.removeRecord(index);
	}

	viewRecord(record: RecordComparisonItem) {
		this.drawerService.open(RunDrawerActionsComponent, {
			title: 'View Run',
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.VIEW,
			data: record
		});
	}

	editRecord(index: number, record: RecordComparisonItem) {
		const drawerRef = this.drawerService.open(RunDrawerActionsComponent, {
			title: 'Edit Run',
			saveButtonLabel: 'Update',
			showCloseButton: true,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.EDIT,
			data: record
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
				if (isEmptyObject(result)) {
					return;
				}

				this.recordsDataService.updateRecord(index, result!);
			});
	}
}
