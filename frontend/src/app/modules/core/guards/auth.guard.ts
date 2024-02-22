import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageKeys } from '../models/constants/storage.constants';
import { RoutesList } from '../models/enums/routes-list.enum';
import { StorageApp } from '../storage/storage-app';

@Injectable()
export class AuthGuard {
	constructor(private router: Router) {}

	canActivate(): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
		const token = StorageApp.getNestedItem(
			StorageKeys.CORE.ROOT,
			`${StorageKeys.AUTH.ROOT}.${StorageKeys.AUTH.USER.ROOT}.${StorageKeys.AUTH.USER.JWT}`
		);

		if (token) {
			return true;
		}

		this.router.navigate([`/${RoutesList.AUTH.ROOT}`]);
		return false;
	}
}
