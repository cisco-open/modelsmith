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

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BannerService } from '../../modules/core/services';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandlingService {
	constructor(private bannerService: BannerService) {}

	handleError(_: HttpRequest<any>, errorResponse: HttpErrorResponse): Observable<never> {
		const error = errorResponse.error;
		const { error: errorMessage } = error;

		switch (errorResponse.status) {
			case 400:
			case 404:
			case 500:
			case 503:
				this.spawnNotification(errorMessage);
				break;
			case 504:
				this.spawnNotification(error);
				break;
			default:
				this.spawnNotification(errorMessage);
				break;
		}

		return throwError(() => errorResponse);
	}

	private spawnNotification(body: string) {
		this.bannerService.showError(body);
	}
}

@Injectable()
export class AppErrorHandlingInterceptor implements HttpInterceptor {
	constructor(private errorHandler: HttpErrorHandlingService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) => {
				return this.errorHandler.handleError(req, error);
			})
		);
	}
}
