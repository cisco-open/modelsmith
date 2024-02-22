import { Component } from '@angular/core';
import { BannerService } from '../../../core/services';

@Component({
	selector: 'ms-notifications-demo',
	templateUrl: './notifications-demo.component.html',
	styleUrls: ['./notifications-demo.component.scss']
})
export class NotificationsDemoComponent {
	constructor(public snackbarService: BannerService) {}
}
