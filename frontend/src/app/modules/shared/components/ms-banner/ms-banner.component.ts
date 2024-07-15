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

import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationTypes } from './models/snackbar-types.enum';

@Component({
	selector: 'ms-banner',
	templateUrl: './ms-banner.component.html',
	styleUrls: ['./ms-banner.component.scss'],
	standalone: true,
	imports: [MatIconModule]
})
export class MsBannerComponent {
	readonly NotificationTypes: typeof NotificationTypes = NotificationTypes;

	constructor(
		public bannerRef: MatSnackBarRef<MsBannerComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: any
	) {}
}
