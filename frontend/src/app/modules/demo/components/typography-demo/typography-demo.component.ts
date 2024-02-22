import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'ms-typography-demo',
	templateUrl: './typography-demo.component.html',
	styleUrls: ['./typography-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyDemoComponent {
	constructor() {}
}
