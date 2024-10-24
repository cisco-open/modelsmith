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

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DRAWER_DATA, DrawerRef, DrawerStatus } from '../../../../core/components/ms-drawer';

@Component({
	selector: 'ms-drawer-with-buttons-actions',
	templateUrl: './drawer-with-buttons-actions.component.html',
	styleUrls: ['./drawer-with-buttons-actions.component.scss']
})
export class DrawerWithButtonsActionsComponent implements OnInit {
	form!: FormGroup;

	constructor(
		private drawerRef: DrawerRef,
		@Inject(DRAWER_DATA) public drawerConfig: any,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			address: ['', [Validators.required]]
		});
	}

	save(status: DrawerStatus): void {
		if (status !== DrawerStatus.SAVE) {
			return;
		}

		this.drawerRef.close({ result: this.form.getRawValue(), status });
	}
}
