import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ag-cards-demo',
	templateUrl: './cards-demo.component.html',
	styleUrls: ['./cards-demo.component.scss']
})
export class CardsDemoComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	handleSelected(option: string | null) {
		console.log('Selected option:', option);
	}
}
