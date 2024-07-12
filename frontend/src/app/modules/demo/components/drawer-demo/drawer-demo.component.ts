//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { DrawerConfig, DrawerService } from '../../../shared/components/ms-drawer';
import { DrawerBasicDemoComponent } from './drawer-basic-demo/drawer-basic-demo.component';
import { DrawerWithAlternativeActionsTemplateComponent } from './drawer-with-alternative-actions-template/drawer-with-alternative-actions-template.component';
import { DrawerWithAlternativeHeaderTemplateComponent } from './drawer-with-alternative-header-template/drawer-with-alternative-header-template.component';
import { DrawerWithButtonsActionsComponent } from './drawer-with-buttons-actions/drawer-with-buttons-actions.component';
import { DrawerWithCustomizableWidthComponent } from './drawer-with-customizable-width/drawer-with-customizable-width.component';
import { DrawerWithDisabledButtonsActionsComponent } from './drawer-with-disabled-buttons-actions/drawer-with-disabled-buttons-actions.component';
import { DrawerWithInjectedDataComponent } from './drawer-with-injected-data/drawer-with-injected-data.component';
import { DrawerWithOnlyOneButtonComponent } from './drawer-with-only-one-button/drawer-with-only-one-button.component';

@Component({
	selector: 'ms-drawer-demo',
	templateUrl: './drawer-demo.component.html',
	styleUrls: ['./drawer-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerDemoComponent implements OnInit {
	constructor(private drawerService: DrawerService) {}

	ngOnInit(): void {}

	openDrawer() {
		const drawerRef = this.drawerService.open(DrawerBasicDemoComponent, { title: 'Lorem Ipsum' } as DrawerConfig);

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}

	openDrawerWithInjectedData() {
		const data = {
			field1: 'value1',
			field2: 'value2'
		};

		const drawerRef = this.drawerService.open(DrawerWithInjectedDataComponent, {
			title: 'Drawer with injected data',
			data
		} as DrawerConfig);

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}

	openDrawerWithAlternativeHeader() {
		const drawerRef = this.drawerService.open(DrawerWithAlternativeHeaderTemplateComponent);

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}

	openDrawerWithOnlyOneButton() {
		const drawerRef = this.drawerService.open(DrawerWithOnlyOneButtonComponent, {
			title: 'Only one button',
			showSaveButton: false,
			closeButtonLabel: 'Close'
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}

	openDrawerWithAlternativeActions() {
		const drawerRef = this.drawerService.open(DrawerWithAlternativeActionsTemplateComponent, {
			title: 'Alternative Footer'
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}

	openDrawerWithDisabledButtons() {
		const drawerRef = this.drawerService.open(DrawerWithDisabledButtonsActionsComponent, {
			title: 'Disabled buttons'
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}

	openDrawerWithButtonsActions() {
		const drawerRef = this.drawerService.open(DrawerWithButtonsActionsComponent, {
			title: 'Buttons Actions'
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((data) => {
				alert(`Clicked on ${data.status}, name = ${data.result.name}, address =  ${data.result.address}`);
			});
	}

	openDrawerWithCustomizableWidth() {
		const drawerRef = this.drawerService.open(DrawerWithCustomizableWidthComponent, {
			title: 'Drawer With Customizable Width',
			width: 500
		} as DrawerConfig);

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				console.log('Drawer closed!');
			});
	}
}
