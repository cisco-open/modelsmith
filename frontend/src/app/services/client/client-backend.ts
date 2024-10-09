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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Client } from './client';
import { ServiceCall } from './serviceCalls/service-call';

export class ClientBackend implements Client {
	constructor(private httpClient: HttpClient) {}

	private get httpHeaders(): HttpHeaders {
		return new HttpHeaders();
	}

	private getRequestOptions(serviceCall: ServiceCall<any>) {
		const params = serviceCall.getParams || undefined;

		return {
			headers: this.httpHeaders,
			params: params
		};
	}

	public serviceCall<Response>(serviceCall: ServiceCall<Response>): Observable<Response> {
		if (isDevMode()) {
			console.log(`serviceCall@Client - ${serviceCall.getMethod} - ${serviceCall.getUrl}`);
		}

		return of(serviceCall).pipe(
			switchMap((call) => {
				if (call.getMock) {
					return this.httpClient.get(call.getUrl, this.getRequestOptions(call)).pipe(delay(call.getMockDelay));
				}

				switch (call.getMethod) {
					case 'GET':
						return this.httpClient.get<any>(call.getUrl, this.getRequestOptions(call));
					case 'POST':
						return this.httpClient.post<any>(call.getUrl, call.getBody, this.getRequestOptions(call));
					case 'PUT':
						return this.httpClient.put<any>(call.getUrl, null, this.getRequestOptions(call));
					default:
						throw new Error(`Unsupported method: ${call.getMethod}`);
				}
			})
		);
	}
}
