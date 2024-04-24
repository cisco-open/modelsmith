import { Component } from '@angular/core';
import { DrawerService } from '../../../shared/standalone/ms-drawer';
import { AddRunDrawerComponent } from '../add-run-drawer/add-run-drawer.component';

@Component({
	selector: 'ms-algorithm-comparison',
	templateUrl: './algorithm-comparison.component.html',
	styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent {
	constructor(private drawerService: DrawerService) {}

	openAddRunDrawer() {
		// const drawerRef =
		this.drawerService.open(AddRunDrawerComponent, {
			title: 'Add Run',
			saveButtonLabel: 'Add'
		});

		// drawerRef
		// 	.afterClosed()
		// 	.pipe(take(1))
		// 	.subscribe(() => {});
	}
}
