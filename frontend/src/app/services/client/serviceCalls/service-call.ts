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

		this.url =
			environment.backendBaseUrl +
			'/' +
			(this.mock ? environment.apiUrl.replace('rest', 'mock') : environment.apiUrl) +
			url;
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
