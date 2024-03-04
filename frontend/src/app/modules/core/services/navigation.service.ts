import { Injectable } from '@angular/core';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoutesList } from '../models/enums/routes-list.enum';

@Injectable()
export class NavigationService {
	private history: string[] = [];

	constructor(private router: Router) {
		this.router.events
			.pipe(filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.history.push(event.urlAfterRedirects);
			});
	}

	goToPreviousPage(defaultRoute: string = RoutesList.MODEL_COMPRESSION.ROOT): void {
		const previousUrl = this.getPreviousUrl();

		if (previousUrl === '/') {
			this.router.navigateByUrl(`/${defaultRoute}`);
		} else {
			this.router.navigateByUrl(previousUrl);
		}
	}

	private getPreviousUrl(): string {
		return this.history[this.history.length - 2] || '/';
	}
}
