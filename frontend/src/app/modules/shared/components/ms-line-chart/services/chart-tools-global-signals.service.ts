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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ChartToolsGlobalSignalsService {
	private _toggleTooltipsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _toggleZoomSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get toggleZoom$(): Observable<boolean> {
		return this._toggleZoomSubject.asObservable();
	}

	set toggleZoom(value: boolean) {
		this._toggleZoomSubject.next(value);
	}

	get toggleTooltips$(): Observable<boolean> {
		return this._toggleTooltipsSubject.asObservable();
	}

	set toggleTooltips(value: boolean) {
		this._toggleTooltipsSubject.next(value);
	}

	constructor() {}
}
