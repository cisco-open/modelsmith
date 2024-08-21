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

import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { skip, take } from 'rxjs';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalActions } from '../../../../../../state/core/terminal';
import { TerminalFacadeService } from '../../../../../core/services';
import { disableBackgroundScroll, enableBackgroundScroll } from '../../../../shared.utils';
import { DIALOG_DATA, DialogConfig, MsDialogComponent } from '../../../ms-dialog';
import { TerminalMessageType } from '../../models/terminal-message-type.enum';
import { TerminalMessage } from '../../models/terminal-message.interface';

@UntilDestroy()
@Component({
	selector: 'ms-terminal-messages-history-dialog',
	standalone: true,
	imports: [MsDialogComponent],
	templateUrl: './terminal-messages-history-dialog.component.html',
	styleUrl: './terminal-messages-history-dialog.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class TerminalMessagesHistoryDialogComponent implements OnInit, OnDestroy {
	@ViewChild('terminalHistory', { static: true }) terminalHistoryDiv!: ElementRef;

	private terminal: Terminal = new Terminal({
		theme: {
			background: '#D0D4D9',
			foreground: '#000000',
			cursor: '#000000'
		}
	});

	private fitAddon: FitAddon = new FitAddon();
	private resizeObserver?: ResizeObserver;

	constructor(
		@Inject(DIALOG_DATA) public dialogConfig: DialogConfig,
		private terminalFacadeService: TerminalFacadeService
	) {}

	ngOnInit(): void {
		this.initializeTerminal();
		this.loadData();

		disableBackgroundScroll();
	}

	private loadData() {
		this.terminalFacadeService.dispatch(TerminalActions.getAllMessages());

		this.terminalFacadeService.allMessages$.pipe(skip(1), take(1)).subscribe((messages: TerminalMessage[]) => {
			messages.forEach((messageObj: TerminalMessage) => {
				const formattedMessage = this.formatMessageByType(messageObj);
				this.writeToTerminal(formattedMessage);
			});
		});
	}

	private writeToTerminal(message: string): void {
		const lines = message.split('\n');
		lines.forEach((line) => {
			this.terminal.writeln(line);
		});
	}

	private formatMessageByType(message: TerminalMessage): string {
		let colorCode = '';
		switch (message.type) {
			case TerminalMessageType.ERROR:
				colorCode = '\x1b[38;5;124m';
				break;
			case TerminalMessageType.SUCCESS:
				colorCode = '\x1b[38;5;22m';
				break;
			case TerminalMessageType.WARNING:
				colorCode = '\x1b[38;5;136m';
				break;
			case TerminalMessageType.INFO:
			default:
				colorCode = '\x1b[38;5;0m';
				break;
		}

		let formattedData = message.data;
		if (formattedData.endsWith('\n')) {
			formattedData = formattedData.slice(0, -1);
		}

		return `${colorCode}${formattedData}\x1b[0m`;
	}

	private initializeTerminal(): void {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.open(this.terminalHistoryDiv.nativeElement);
		this.terminal.writeln('Welcome to ModelSmith terminal!\r\n');

		this.setupResizeObserver();
	}

	private setupResizeObserver(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}

		this.resizeObserver = new ResizeObserver(() => this.fitTerminalToContainer());
		this.resizeObserver.observe(this.terminalHistoryDiv.nativeElement);
	}

	private fitTerminalToContainer(): void {
		this.fitAddon.fit();
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		enableBackgroundScroll();
	}
}
