import { Component, Input } from '@angular/core';

@Component({
	selector: 'ms-footer',
	templateUrl: './ms-footer.component.html',
	styleUrls: ['./ms-footer.component.scss']
})
export class MsFooterComponent {
	@Input() styleMode: 'fullWidth' | 'mainLayout' = 'fullWidth';
	currentYear: number = new Date().getFullYear();
}
