import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLatestMessages } from '../../../state/core/terminal/terminal.selector';
import { TerminalState } from '../../../state/core/terminal/terminal.state';
import { TerminalMessage } from '../models/interfaces/terminal-message.interface';

@Injectable()
export class TerminalFacadeService {
	messages$: Observable<TerminalMessage[]>;

	constructor(private store: Store<TerminalState>) {
		this.messages$ = this.store.select(selectLatestMessages);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
