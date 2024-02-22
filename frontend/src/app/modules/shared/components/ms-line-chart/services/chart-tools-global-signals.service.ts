import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ChartToolsGlobalSignalsService {
	private _toggleTooltipsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _toggleZoomSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get toggleZoom$(): Observable<boolean> {
		return this._toggleZoomSubject.asObservable();
	}

	set toggleZoom(value: boolean) {
		this._toggleZoomSubject.next(value);
	}

	get toggleTooltips$(): Observable<boolean> {
		return this._toggleTooltipsSubject.asObservable();
	}

	set toggleTooltips(value: boolean) {
		this._toggleTooltipsSubject.next(value);
	}

	constructor() {}
}
