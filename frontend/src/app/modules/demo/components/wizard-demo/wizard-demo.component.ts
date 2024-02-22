import { Component } from '@angular/core';

@Component({
	selector: 'ag-wizard-demo',
	templateUrl: './wizard-demo.component.html',
	styleUrls: ['./wizard-demo.component.scss']
})
export class WizardDemoComponent {
	constructor() {}

	handleSelected(option: string | null) {
		console.log('Selected option:', option);
	}
}
