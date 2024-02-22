import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlingService } from './http-error-handling.interceptor';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
	constructor(private errorHandler: HttpErrorHandlingService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) => {
				return this.errorHandler.handleError(req, error);
			})
		);
	}
}
