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

import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogConfig, DialogRef } from '../../../../core/components/ms-dialog';

@Component({
	selector: 'ms-dialog-custom-size',
	templateUrl: './dialog-custom-size.component.html',
	styleUrl: './dialog-custom-size.component.scss'
})
export class DialogCustomSizeComponent {
	constructor(
		private dialogRef: DialogRef,
		@Inject(DIALOG_DATA) public dialogConfig: DialogConfig
	) {}
}
