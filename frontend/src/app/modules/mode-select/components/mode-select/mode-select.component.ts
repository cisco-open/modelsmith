//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { Component, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ConfigActions } from '../../../../state/core/configs/configs.actions';
import { AppModes } from '../../../core/models/enums/app-modes.enum';
import { RoutesList } from '../../../core/models/enums/routes-list.enum';
import { AuthFacadeService } from '../../../core/services/auth-facade.service';
import { ConfigsFacadeService } from '../../../core/services/configs-facade.service';

@Component({
	selector: 'ms-mode-select',
	templateUrl: './mode-select.component.html',
	styleUrls: ['./mode-select.component.scss']
})
export class ModeSelectComponent {
	@ViewChild('configureDefaultMode') defaultModeCheckbox!: MatCheckbox;

	constructor(
		public authFacadeService: AuthFacadeService,
		private configsFacadeService: ConfigsFacadeService,
		private router: Router
	) {}

	setModeAndNavigate(mode?: AppModes) {
		const selectedMode = this.defaultModeCheckbox.checked ? mode : undefined;
		this.configsFacadeService.dispatch(ConfigActions.setDefaultMode({ mode: selectedMode }));
		this.configsFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: selectedMode }));
	}

	goToExpertMode() {
		this.setModeAndNavigate(AppModes.EXPERT);
		this.router.navigate([RoutesList.MODEL_COMPRESSION.ROOT]);
	}

	goToGuidedMode() {
		this.setModeAndNavigate(AppModes.GUIDED);
		this.router.navigate([RoutesList.WIZARD.ROOT]);
	}
}
