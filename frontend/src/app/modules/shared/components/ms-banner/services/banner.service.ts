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

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationTypes } from '../models/snackbar-types.enum';
import { MsBannerComponent } from '../ms-banner.component';

export const DEFAULT_SUCCESS_SNACKBAR_DURATION: number = 5000;
export const DEFAULT_INFO_SNACKBAR_DURATION: number = 5000;
export const DEFAULT_ERROR_SNACKBAR_DURATION: number = 10000;

@Injectable({ providedIn: 'root' })
export class BannerService {
	constructor(private snackbar: MatSnackBar) {}

	public showSuccess(message: string): void {
		this.showBanner(
			message,
			NotificationTypes.SUCCESS,
			DEFAULT_SUCCESS_SNACKBAR_DURATION,
			'notification-panel-success'
		);
	}

	public showInfo(message: string): void {
		this.showBanner(message, NotificationTypes.INFO, DEFAULT_INFO_SNACKBAR_DURATION, 'notification-panel-info');
	}

	public showError(message: string): void {
		this.showBanner(message, NotificationTypes.ERROR, DEFAULT_ERROR_SNACKBAR_DURATION, 'notification-panel-error');
	}

	public showWarning(message: string): void {
		this.showBanner(message, NotificationTypes.WARNING, DEFAULT_INFO_SNACKBAR_DURATION, 'notification-panel-warning');
	}

	private showBanner(message: string, notificationType: NotificationTypes, duration: number, panelClass: string): void {
		this.snackbar.openFromComponent(MsBannerComponent, {
			duration,
			data: {
				message,
				notificationType
			},
			panelClass
		});
	}
}
