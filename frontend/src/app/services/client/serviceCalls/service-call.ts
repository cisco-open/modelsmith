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

import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export abstract class ServiceCall<Response> {
	protected mock!: boolean;
	protected mockDelay = 0;
	protected method: HttpMethod;
	protected url: string;
	protected params?: HttpParams;
	protected body?: any;
	protected options: any = {};

	public get getMock() {
		return this.mock;
	}

	public get getMockDelay() {
		return this.mockDelay;
	}

	public get getMethod() {
		return this.method;
	}
	public get getUrl() {
		return this.url;
	}
	public get getParams() {
		return this.params;
	}
	public get getBody() {
		return this.body;
	}

	public get getOptions() {
		return this.options;
	}

	protected constructor(method: HttpMethod, url: string, params?: HttpParams, options?: any, mock?: boolean) {
		this.method = method;
		this.params = params;
		this.options = options || {};

		if (mock) {
			this.mock = mock;
		}

		this.url = '';
		if (this.mock) {
			this.url = `/mock/${url}`;
		} else {
			this.url = `${environment.backendBaseUrl}/${environment.apiUrl}/${url}`;
		}
	}
}

export abstract class ServiceCallGET<Response> extends ServiceCall<Response> {
	protected constructor(url: string, params?: HttpParams, options?: any, mock: boolean = true) {
		let newParams = new HttpParams();
		if (params) {
			newParams = params;
		}
		super('GET', url, newParams, options, mock);
	}
}

export abstract class ServiceCallPOST<Response> extends ServiceCall<Response> {
	protected constructor(url: string, body: Object, mock: boolean = true) {
		super('POST', url, undefined, undefined, mock);
		this.body = body;
	}
}

export abstract class ServiceCallPUT extends ServiceCall<null> {
	protected constructor(url: string, mock: boolean = true) {
		super('PUT', url, undefined, undefined, mock);
	}
}
