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
import { DRAWER_DATA, DrawerConfig, DrawerRef } from '../../../../shared/standalone/ms-drawer';

@Component({
	selector: 'ms-run-drawer-actions',
	templateUrl: './drawer-basic-demo.component.html',
	styleUrls: ['./drawer-basic-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerBasicDemoComponent implements OnInit {
	constructor(
		private drawerRef: DrawerRef,
		@Inject(DRAWER_DATA) public drawerConfig: DrawerConfig
	) {}

	ngOnInit(): void {}

	close() {
		this.drawerRef.close();
	}
}
