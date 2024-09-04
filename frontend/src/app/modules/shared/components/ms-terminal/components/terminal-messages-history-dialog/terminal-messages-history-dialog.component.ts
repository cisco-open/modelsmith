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

import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy } from '@ngneat/until-destroy';
import { debounceTime, skip, take } from 'rxjs';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalActions } from '../../../../../../state/core/terminal';
import { TerminalFacadeService } from '../../../../../core/services';
import { disableBackgroundScroll, enableBackgroundScroll } from '../../../../shared.utils';
import { DIALOG_DATA, DialogConfig, MsDialogComponent } from '../../../ms-dialog';
import { TerminalMessage } from '../../models/terminal-message.interface';

@UntilDestroy()
@Component({
	selector: 'ms-terminal-messages-history-dialog',
	standalone: true,
	imports: [MsDialogComponent, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule],
	templateUrl: './terminal-messages-history-dialog.component.html',
	styleUrl: './terminal-messages-history-dialog.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class TerminalMessagesHistoryDialogComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('terminalHistory', { static: true }) terminalHistoryDiv!: ElementRef;

	searchControl = new FormControl('');

	private terminal: Terminal = new Terminal({
		theme: {
			background: '#D0D4D9',
			foreground: '#000000',
			cursor: '#000000'
		}
	});

	private fitAddon: FitAddon = new FitAddon();
	private resizeObserver?: ResizeObserver;
	private messages: TerminalMessage[] = [];
	private worker: Worker | null = null;

	constructor(
		@Inject(DIALOG_DATA) public dialogConfig: DialogConfig,
		private terminalFacadeService: TerminalFacadeService
	) {}

	ngOnInit(): void {
		this.initializeTerminal();
		this.loadData();
		disableBackgroundScroll();
		this.setupSearch();
	}

	ngAfterViewInit(): void {
		this.adjustHeightToParent();
		this.fitTerminalToContainer();
	}

	private loadData() {
		this.terminalFacadeService.dispatch(TerminalActions.getAllMessages());

		this.terminalFacadeService.allMessages$.pipe(skip(1), take(1)).subscribe((messages: TerminalMessage[]) => {
			this.messages = messages;
			this.processMessagesWithWorker(this.messages);
		});
	}

	private processMessagesWithWorker(messages: TerminalMessage[], searchTerm: string = ''): void {
		if (!this.worker) {
			this.worker = new Worker(new URL('../../utils/message-formatter.worker.ts', import.meta.url));

			this.worker.onmessage = ({ data }) => {
				this.displayMessagesInTerminal(data);
			};
		}

		this.worker.postMessage({ messages, searchTerm });
	}

	private displayMessagesInTerminal(formattedMessages: string[]): void {
		this.terminal.clear();
		formattedMessages.forEach((message) => {
			this.writeToTerminal(message);
		});
	}

	private writeToTerminal(message: string): void {
		const lines = message.split('\n');
		lines.forEach((line) => {
			this.terminal.writeln(line);
		});
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

	private setupSearch(): void {
		this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((searchTerm) => {
			this.processMessagesWithWorker(this.messages, searchTerm ?? '');
		});
	}

	private adjustHeightToParent(): void {
		const rightSideElement =
			this.terminalHistoryDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;

		if (rightSideElement) {
			let finalHeight: number;
			const heightCorrection = 320;
			finalHeight = rightSideElement.offsetHeight - heightCorrection;
			this.terminalHistoryDiv.nativeElement.style.height = `${finalHeight}px`;
		}
	}

	scrollToTopTerminal() {
		this.terminal.scrollToTop();
	}

	scrollToBottomTerminal() {
		this.terminal.scrollToBottom();
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		enableBackgroundScroll();
	}
}
