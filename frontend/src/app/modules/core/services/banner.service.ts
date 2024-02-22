import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MsBannerComponent } from '../../shared/components/ms-banner/ms-banner.component';
import { NotificationTypes } from '../models/enums/snackbar-types.enum';

export const DEFAULT_SUCCESS_SNACKBAR_DURATION: number = 5000;
export const DEFAULT_INFO_SNACKBAR_DURATION: number = 5000;
export const DEFAULT_ERROR_SNACKBAR_DURATION: number = 10000;

@Injectable()
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
