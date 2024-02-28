import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BannerService } from '../../modules/core/services/banner.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandlingService {
	constructor(private bannerService: BannerService) {}

	handleError(request: HttpRequest<any>, errorResponse: HttpErrorResponse): Observable<never> {
		const error = errorResponse.error;
		const { error: errorMessage } = error;

		switch (errorResponse.status) {
			case 400:
			case 404:
			case 500:
			case 503:
				this.spawnNotification(errorMessage);
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
