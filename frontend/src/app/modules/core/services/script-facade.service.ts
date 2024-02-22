import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ScriptDetails } from '../../../services/client/models/script/script-details.interface-dto';
import { selectScriptDetails, selectScriptStatus } from '../../../state/core/script/script.selector';
import { ScriptState } from '../../../state/core/script/script.state';
import { ScriptStatusEnum } from '../../model-compression/models/enums/script-status.enum';

@Injectable()
export class ScriptFacadeService {
	scriptStatus$: Observable<ScriptStatusEnum | null>;
	scriptDetails$: Observable<ScriptDetails | null>;

	constructor(private store: Store<ScriptState>) {
		this.scriptStatus$ = this.store.select(selectScriptStatus);
		this.scriptDetails$ = this.store.select(selectScriptDetails);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
