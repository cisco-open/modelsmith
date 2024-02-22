import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'ms-error-message',
	templateUrl: './ms-error-message.component.html',
	styleUrls: ['./ms-error-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MsErrorMessageComponent {
	@Input() text?: string;

	constructor() {}
}
