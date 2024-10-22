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

import { Component, Inject, OnInit } from '@angular/core';
import { DRAWER_DATA, DrawerRef } from '../../../../core/components/ms-drawer';

@Component({
	selector: 'ms-drawer-with-disabled-buttons-actions',
	templateUrl: './drawer-with-disabled-buttons-actions.component.html',
	styleUrls: ['./drawer-with-disabled-buttons-actions.component.scss']
})
export class DrawerWithDisabledButtonsActionsComponent implements OnInit {
	isSaveDisabled: boolean = true;

	constructor(
		private drawerRef: DrawerRef,
		@Inject(DRAWER_DATA) public drawerConfig: any
	) {}

	ngOnInit(): void {}
}
