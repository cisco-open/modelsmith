import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AppErrorHandlingInterceptor } from './interceptor/app-error-handling-interceptor';
import { AppLoadingInterceptor } from './interceptor/app-loading-interceptor';

// Don't forget about provideHttpClient(withInterceptorsFromDi()) in the app.config.ts

export function provideInterceptors(): Provider[] {
	return [
		{ provide: HTTP_INTERCEPTORS, useClass: AppErrorHandlingInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AppLoadingInterceptor, multi: true }
	];
}
