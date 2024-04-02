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
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoutesList } from '../models/enums/routes-list.enum';

@Injectable()
export class NavigationService {
	private history: string[] = [];

	constructor(private router: Router) {}

	public trackNavigationHistory() {
		this.addInitialUrl();

		this.router.events
			.pipe(filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.history.push(event.urlAfterRedirects);
			});
	}

	addInitialUrl() {
		const initialUrl = this.router.url;
		this.history.push(initialUrl);
	}

	goToPreviousPage(defaultRoute: string = RoutesList.MODEL_COMPRESSION.ROOT): void {
		const previousUrl = this.getPreviousUrl();

		if (previousUrl === '/') {
			this.router.navigateByUrl(`/${defaultRoute}`);
		} else {
			this.router.navigateByUrl(previousUrl);
		}
	}

	private getPreviousUrl(): string {
		return this.history[this.history.length - 2] || '/';
	}
}
