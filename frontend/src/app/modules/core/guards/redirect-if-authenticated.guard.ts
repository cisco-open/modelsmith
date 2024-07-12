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

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageApp } from '../../shared/storage/storage-app';
import { StorageKeys } from '../../shared/storage/storage.constants';
import { RoutesList } from '../models/enums/routes-list.enum';

@Injectable()
export class RedirectIfAuthenticatedGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
		const token = StorageApp.getNestedItem(
			StorageKeys.CORE.ROOT,
			`${StorageKeys.AUTH.ROOT}.${StorageKeys.AUTH.USER.ROOT}.${StorageKeys.AUTH.USER.JWT}`
		);

		if (!!token) {
			this.router.navigate([`/${RoutesList.MODE_SELECT.ROOT}`]);

			return false;
		}

		return true;
	}
}
