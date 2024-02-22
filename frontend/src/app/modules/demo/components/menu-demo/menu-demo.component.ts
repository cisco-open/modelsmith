import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'ms-menu-demo',
	templateUrl: './menu-demo.component.html',
	styleUrls: ['./menu-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDemoComponent {}
