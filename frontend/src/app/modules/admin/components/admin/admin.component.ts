//   Copyright 2024 Cisco Systems, Inc.

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

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { ConfigActions } from '../../../../state/core/configs';
import { AppModes } from '../../../core/models/enums/app-modes.enum';
import { ConfigsFacadeService } from '../../../core/services';
import { isNilOrEmptyString } from '../../../shared/shared.utils';

@UntilDestroy()
@Component({
	selector: 'ms-admin',
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
	selectedModeControl = new FormControl('');
	readonly AppModes: typeof AppModes = AppModes;

	constructor(private configsFacadeService: ConfigsFacadeService) {}

	ngOnInit() {
		this.loadDefaultValue();
		this.listenToModeChanges();
	}

	private listenToModeChanges(): void {
		this.selectedModeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((mode) => {
			if (isNilOrEmptyString(mode)) {
				return;
			}

			this.configsFacadeService.dispatch(ConfigActions.setDefaultMode({ mode: mode as AppModes }));
		});
	}

	private loadDefaultValue(): void {
		this.configsFacadeService.defaultMode$.pipe(take(1)).subscribe((defaultMode) => {
			if (isNilOrEmptyString(defaultMode)) {
				return;
			}
			this.selectedModeControl.setValue(defaultMode!);
		});
	}
}
