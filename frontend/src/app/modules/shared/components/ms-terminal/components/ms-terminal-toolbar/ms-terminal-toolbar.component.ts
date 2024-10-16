//   Copyright 2024 Cisco Systems, Inc.

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { ScriptActions } from '../../../../../../state/core/script/script.actions';
import { ScriptFacadeService } from '../../../../../core/services/script-facade.service';
import { isScriptActive } from '../../../../../model-compression/models/enums/script-status.enum';
import { MsTooltipPanelDirective } from '../../../../directives/ms-tooltip-panel/ms-tooltip-panel.directive';
import { isNilOrEmptyString } from '../../../../shared.utils';
import { DialogConfig, DialogService } from '../../../ms-dialog';
import { TerminalWebSocketService } from '../../services/terminal-websocket.service';
import { MsTerminalMessagesHistoryDialogComponent } from '../ms-terminal-messages-history-dialog/ms-terminal-messages-history-dialog.component';

@UntilDestroy({})
@Component({
	selector: 'ms-terminal-toolbar',
	templateUrl: './ms-terminal-toolbar.component.html',
	styleUrls: ['./ms-terminal-toolbar.component.scss'],
	standalone: true,
	imports: [
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MsTooltipPanelDirective,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule
	],
	providers: [DialogService]
})
export class MsTerminalToolbarComponent implements OnInit {
	isScriptActive: boolean = false;

	searchFormControl = new FormControl<string>('');

	@Output() scrollToTopTerminal = new EventEmitter();
	@Output() scrollToBottomTerminal = new EventEmitter();
	@Output() searchTerminal = new EventEmitter<string>();
	@Output() disposeSearch = new EventEmitter();

	constructor(
		private scriptFacadeService: ScriptFacadeService,
		private dialogService: DialogService,
		private terminalWebSocketService: TerminalWebSocketService
	) {}

	ngOnInit(): void {
		this.listenToScriptStateChanges();
		this.listenToSearchFormControlChanges();
	}

	public clearTerminal() {
		this.terminalWebSocketService.clearScreen();
	}

	private listenToSearchFormControlChanges(): void {
		this.searchFormControl.valueChanges
			.pipe(
				untilDestroyed(this),
				delay(300),
				filter((value: string | null): value is string => !isNilOrEmptyString(value))
			)
			.subscribe((value: string) => {
				this.searchTerminal.emit(value);
			});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	ctaStopScript() {
		this.scriptFacadeService.dispatch(ScriptActions.stopScript());
	}

	openTerminalMessagesHistoryDialog() {
		this.dialogService.open(MsTerminalMessagesHistoryDialogComponent, {
			title: 'Terminal history',
			showSaveButton: false,
			width: '60vw',
			height: '75vh'
		} as DialogConfig);
	}
}
