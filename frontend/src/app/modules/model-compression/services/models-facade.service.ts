import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../state/core/auth';
import { selectModelsByType } from '../../../state/core/models/models.selector';
import { AlgorithmType } from '../models/enums/algorithms.enum';

@Injectable()
export class ModelsFacadeService {
	constructor(private store: Store<AuthState>) {}

	getModelsByType(algorithmType: AlgorithmType): Observable<string[] | undefined> {
		return this.store.select(selectModelsByType(algorithmType));
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
