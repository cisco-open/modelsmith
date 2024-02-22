import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'ms-buttons-demo',
	templateUrl: './buttons-demo.component.html',
	styleUrls: ['./buttons-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsDemoComponent {}
