import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'ms-header',
	templateUrl: './ms-header.component.html',
	styleUrls: ['./ms-header.component.scss']
})
export class MsHeaderComponent {
	search = new FormControl();
}
