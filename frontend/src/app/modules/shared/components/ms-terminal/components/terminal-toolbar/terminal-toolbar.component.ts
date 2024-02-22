import { Component, EventEmitter, Output } from '@angular/core';
import { ScriptActions } from '../../../../../../state/core/script/script.actions';
import { ScriptFacadeService } from '../../../../../core/services/script-facade.service';

@Component({
	selector: 'ms-terminal-toolbar',
	templateUrl: './terminal-toolbar.component.html',
	styleUrls: ['./terminal-toolbar.component.scss']
})
export class TerminalToolbarComponent {
	@Output() clearTerminal = new EventEmitter<string>();
	@Output() scrollToTopTerminal = new EventEmitter<string>();
	@Output() scrollToBottomTerminal = new EventEmitter<string>();

	constructor(private scriptFacadeService: ScriptFacadeService) {}

	ctaStopScript() {
		this.scriptFacadeService.dispatch(ScriptActions.stopScript());
	}
}
