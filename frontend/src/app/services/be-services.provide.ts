import { HttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ClientBackend } from './client/client-backend';
import { CLIENT } from './services.tokens';

export function provideBEServices(): Provider[] {
	return [
		{
			provide: CLIENT,
			useFactory: (httpClient: HttpClient) => {
				return new ClientBackend(httpClient);
			},
			deps: [HttpClient]
		}
	];
}
