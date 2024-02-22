import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { KeyValue } from '../../../services/client/models/key-value/key-value.interface-dto';
import { ScriptState } from '../../../state/core/script/script.state';
import { selectStatistics } from '../../../state/core/statistics/statistics.selector';

@Injectable()
export class StatisticsFacadeService {
	statistics$: Observable<KeyValue<string> | null>;

	constructor(private store: Store<ScriptState>) {
		this.statistics$ = this.store.select(selectStatistics);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
