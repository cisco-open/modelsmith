import { Component, Input } from '@angular/core';
import { SidenavItem } from '../../../core/models/interfaces/sidenav.interface';

@Component({
	selector: 'ms-sidenav-item',
	templateUrl: './ms-sidenav-item.component.html',
	styleUrls: ['./ms-sidenav-item.component.scss']
})
export class MsSidenavItemComponent {
	@Input() item!: SidenavItem;
	@Input() itemStyle: 'accent' | 'grey' = 'accent';
}
