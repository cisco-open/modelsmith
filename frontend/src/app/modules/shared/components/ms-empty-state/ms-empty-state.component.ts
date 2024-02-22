import { Component, Input } from '@angular/core';

@Component({
	selector: 'ms-empty-state',
	templateUrl: './ms-empty-state.component.html',
	styleUrls: ['./ms-empty-state.component.scss']
})
export class MsEmptyStateComponent {
	@Input() title: string = '';
	@Input() message: string = '';
}
