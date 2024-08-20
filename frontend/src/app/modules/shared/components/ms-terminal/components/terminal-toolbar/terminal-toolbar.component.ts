//    Copyright 2024 Cisco Systems, Inc. and its affiliates

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

import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScriptActions } from '../../../../../../state/core/script/script.actions';
import { ScriptFacadeService } from '../../../../../core/services/script-facade.service';
import { DialogConfig, DialogService } from '../../../ms-dialog';
import { TerminalMessagesHistoryDialogComponent } from '../terminal-messages-history-dialog/terminal-messages-history-dialog.component';

@Component({
	selector: 'ms-terminal-toolbar',
	templateUrl: './terminal-toolbar.component.html',
	styleUrls: ['./terminal-toolbar.component.scss'],
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatTooltipModule],
	providers: [DialogService]
})
export class MsTerminalToolbarComponent {
	@Output() clearTerminal = new EventEmitter<string>();
	@Output() scrollToTopTerminal = new EventEmitter<string>();
	@Output() scrollToBottomTerminal = new EventEmitter<string>();

	constructor(
		private scriptFacadeService: ScriptFacadeService,
		private dialogService: DialogService
	) {}

	ctaStopScript() {
		this.scriptFacadeService.dispatch(ScriptActions.stopScript());
	}

	openTerminalMessagesHistoryDialog() {
		this.dialogService.open(TerminalMessagesHistoryDialogComponent, {
			title: 'Terminal history',
			showSaveButton: false,
			height: 680
		} as DialogConfig);
	}
}
