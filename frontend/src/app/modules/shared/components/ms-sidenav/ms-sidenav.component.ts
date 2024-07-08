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

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfigActions } from '../../../../state/core/configs/configs.actions';
import { SidenavConstants } from '../../../core/models/constants/sidenav.constants';
import { AppModes } from '../../../core/models/enums/app-modes.enum';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { SidenavItem } from '../../../core/models/interfaces/sidenav.interface';
import { ConfigsFacadeService } from '../../../core/services/configs-facade.service';

@UntilDestroy()
@Component({
	selector: 'ms-sidenav',
	templateUrl: './ms-sidenav.component.html',
	styleUrls: ['./ms-sidenav.component.scss'],
	animations: [
		trigger('expandCollapse', [
			state('expanded', style({ width: '230px' })),
			state('collapsed', style({ width: '40px' })),
			transition('expanded <=> collapsed', animate('300ms ease-in-out'))
		]),
		trigger('fadeInOut', [
			transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in-out', style({ opacity: 1 }))]),
			transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))])
		])
	]
})
export class MsSidenavComponent implements OnInit {
	readonly SidenavConstants = SidenavConstants;
	readonly Modes = AppModes;
	currentMode: AppModes | undefined;
	isExpanded = true;

	constructor(
		private router: Router,
		private configFacadeService: ConfigsFacadeService,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.listenToCurrentModeChanges();
	}

	private listenToCurrentModeChanges() {
		this.configFacadeService.currentMode$.pipe(untilDestroyed(this)).subscribe((currentMode) => {
			this.currentMode = currentMode;
		});
	}

	toggleMode(): void {
		if (this.currentMode === AppModes.GUIDED) {
			this.router.navigate([`/${RoutesList.MODEL_COMPRESSION.ROOT}`]);
			this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.EXPERT }));
		} else {
			this.router.navigate([`/${RoutesList.WIZARD.ROOT}`]);
			this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.GUIDED }));
		}
	}

	trackByRoute(_: number, item: SidenavItem): string {
		return item.route;
	}

	// New method to toggle sidebar expansion
	toggleSidebar(): void {
		this.isExpanded = !this.isExpanded;
	}
}
