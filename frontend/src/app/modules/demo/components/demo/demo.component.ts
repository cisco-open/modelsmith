import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';

@Component({
	selector: 'ms-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {
	readonly RoutesList = RoutesList;

	constructor() {}
}
