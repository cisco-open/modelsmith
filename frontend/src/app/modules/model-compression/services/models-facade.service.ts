import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../state/core/auth';
import { selectModels } from '../../../state/model-compression/models/models.selector';

@Injectable()
export class ModelsFacadeService {
	models$: Observable<string[] | undefined>;

	constructor(private store: Store<AuthState>) {
		this.models$ = this.store.select(selectModels);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
