import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Event as NavigationEvent, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class NavigationService {
	private history: string[] = [];

	constructor(
		private router: Router,
		private location: Location
	) {
		this.router.events
			.pipe(filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.history.push(event.urlAfterRedirects);
			});
	}

	goToPreviousPage(defaultRoute: string): void {
		const previousUrl = this.getPreviousUrl();
		if (previousUrl === '/') {
			this.router.navigateByUrl(`/${defaultRoute}`);
		} else {
			this.location.back();
		}
	}

	private getPreviousUrl(): string {
		return this.history[this.history.length - 2] || '/';
	}
}
