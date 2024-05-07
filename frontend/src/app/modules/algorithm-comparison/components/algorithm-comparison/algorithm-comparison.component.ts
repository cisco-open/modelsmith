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

import { Component } from '@angular/core';
import { take } from 'rxjs';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../shared/standalone/ms-drawer';
import { DrawerActionTypeEnum } from '../../../shared/standalone/ms-drawer/models/drawer-action-type.enum';
import { RecordComparisonItem } from '../../models/record-comparisson.interface';
import { RecordsDataService } from '../../services/records-data.service';
import { RunDrawerActionsComponent } from '../run-drawer-actions/run-drawer-actions.component';

@Component({
	selector: 'ms-algorithm-comparison',
	templateUrl: './algorithm-comparison.component.html',
	styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent {
	constructor(
		private drawerService: DrawerService,
		private recordsDataService: RecordsDataService
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
}
