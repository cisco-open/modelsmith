import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationTypes } from '../../../core/models/enums/snackbar-types.enum';

@Component({
	selector: 'ms-banner',
	templateUrl: './ms-banner.component.html',
	styleUrls: ['./ms-banner.component.scss']
})
export class MsBannerComponent {
	readonly NotificationTypes: typeof NotificationTypes = NotificationTypes;

	constructor(
		public bannerRef: MatSnackBarRef<MsBannerComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: any
	) {}
}
