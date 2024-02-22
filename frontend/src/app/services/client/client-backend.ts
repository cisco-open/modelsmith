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
