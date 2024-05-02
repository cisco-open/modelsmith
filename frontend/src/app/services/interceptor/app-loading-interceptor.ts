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

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

export enum RequestsConfigKeyEnum {
	RUN_RECORDS_SUMMARIZED_DATA = 'runRecordsSummarizedData'
}

export const requestsConfig = [
	{
		key: RequestsConfigKeyEnum.RUN_RECORDS_SUMMARIZED_DATA,
		urlPattern: '/rest/run-records-summarized-data/[^/]+/[^/]+',
		track: true,
		useRegex: true
	}
];

@Injectable({ providedIn: 'root' })
export class CustomAPILoadingService {
	private loadingMap: Map<string, BehaviorSubject<boolean>> = new Map();

	setLoading(isLoading: boolean, key: string): void {
		if (!this.loadingMap.has(key)) {
			this.loadingMap.set(key, new BehaviorSubject<boolean>(false));
		}
		const loadingObservable = this.loadingMap.get(key)!;
		loadingObservable.next(isLoading);
	}

	getLoadingObservableForKey(key: string): Observable<boolean> {
		if (this.loadingMap.has(key)) {
			return this.loadingMap.get(key)!.asObservable();
		} else {
			const newObservable = new BehaviorSubject<boolean>(false);
			this.loadingMap.set(key, newObservable);
			return newObservable.asObservable();
		}
	}
}

@Injectable()
export class AppLoadingInterceptor implements HttpInterceptor {
	constructor(private loadingService: CustomAPILoadingService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const config = this.getMatchingConfig(request);
		if (config && config.track) {
			this.loadingService.setLoading(true, config.key);
		}

		return next.handle(request).pipe(
			finalize(() => {
				if (config && config.track) {
					this.loadingService.setLoading(false, config.key);
				}
			})
		);
	}

	private getMatchingConfig(request: HttpRequest<any>): any {
		const normalizedUrl = request.url.split('?')[0];
		return requestsConfig.find((config) => {
			return (
				config.track &&
				(config.useRegex ? new RegExp(config.urlPattern).test(normalizedUrl) : config.urlPattern === normalizedUrl)
			);
		});
	}
}
