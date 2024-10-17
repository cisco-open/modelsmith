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

import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigActions } from '../../../state/core/configs/configs.actions';
import { StorageApp } from '../../shared/storage/storage-app';
import { StorageKeys } from '../../shared/storage/storage.constants';
import { AppModes } from '../models/enums/app-modes.enum';
import { RoutesList } from '../models/enums/routes-list.enum';
import { ConfigsFacadeService } from '../services/configs-facade.service';

@Injectable()
export class ModeSelectGuard {
	constructor(
		private router: Router,
		private configFacadeService: ConfigsFacadeService
	) {}

	canActivate(): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
		const defaultMode = StorageApp.getNestedItem(
			StorageKeys.CORE.ROOT,
			`${StorageKeys.CONFIGS.ROOT}.${StorageKeys.CONFIGS.DEFAULT_MODE}`
		);

		if (!!defaultMode) {
			if (defaultMode === AppModes.GUIDED) {
				this.router.navigate([`/${RoutesList.WIZARD.ROOT}`]);
				this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.GUIDED }));
			} else {
				this.router.navigate([`/${RoutesList.MODEL_COMPRESSION.ROOT}`]);
				this.configFacadeService.dispatch(ConfigActions.setCurrentMode({ mode: AppModes.EXPERT }));
			}
		}

		return true;
	}
}
