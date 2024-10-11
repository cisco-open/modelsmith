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

import { CommonModule } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchAddon } from '@xterm/addon-search';
import { delay, filter } from 'rxjs';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalActions } from '../../../../../../state/core/terminal';
import { TerminalFacadeService } from '../../../../../core/services';
import { disableBackgroundScroll, enableBackgroundScroll, isNilOrEmptyString } from '../../../../shared.utils';
import { DIALOG_DATA, DialogConfig, MsDialogComponent } from '../../../ms-dialog';

@UntilDestroy()
@Component({
	selector: 'ms-terminal-messages-history-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MsDialogComponent,
		MatIconModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatTooltipModule
	],
	templateUrl: './ms-terminal-messages-history-dialog.component.html',
	styleUrl: './ms-terminal-messages-history-dialog.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class MsTerminalMessagesHistoryDialogComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('terminalHistory', { static: true }) terminalHistoryDiv!: ElementRef;

	searchFormControl = new FormControl<string>('');

	private terminal: Terminal = new Terminal({
		theme: {
			background: '#D0D4D9',
			foreground: '#000000',
			cursor: '#000000'
		},
		cursorBlink: false,
		disableStdin: true,
		allowProposedApi: true
	});

	private fitAddon: FitAddon = new FitAddon();
	private searchAddon = new SearchAddon();
	private resizeObserver?: ResizeObserver;

	constructor(
		@Inject(DIALOG_DATA) public dialogConfig: DialogConfig,
		private terminalFacadeService: TerminalFacadeService
	) {}

	ngOnInit(): void {
		this.initializeTerminal();
		this.loadData();
		this.listenToSearchFormControlChanges();
		disableBackgroundScroll();
	}

	ngAfterViewInit(): void {
		this.adjustHeightToParent();
		this.fitTerminalToContainer();
	}

	private loadData() {
		this.terminalFacadeService.dispatch(TerminalActions.getTerminalHistory());

		this.terminalFacadeService.terminalHistory.pipe(untilDestroyed(this)).subscribe((terminalHistory: string) => {
			if (terminalHistory) {
				this.writeToTerminal(terminalHistory);
			}
		});
	}

	private initializeTerminal(): void {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);
		this.terminal.open(this.terminalHistoryDiv.nativeElement);

		this.setupResizeObserver();
	}

	private listenToSearchFormControlChanges(): void {
		this.searchFormControl.valueChanges
			.pipe(
				untilDestroyed(this),
				delay(300),
				filter((value: string | null): value is string => !isNilOrEmptyString(value))
			)
			.subscribe((value: string) => {
				this.search(value);
			});
	}

	private search(value: string) {
		this.searchAddon.findNext(value, {
			decorations: {
				matchBackground: '#FFFF00',
				matchBorder: '#FFFF00',
				matchOverviewRuler: '#FFFF00',
				activeMatchBackground: '#FFFF00',
				activeMatchBorder: '#FFFF00',
				activeMatchColorOverviewRuler: '#FFFF00'
			}
		});
	}

	public disposeSearch() {
		this.searchAddon.clearDecorations();
		this.searchFormControl.setValue('');
	}

	private writeToTerminal(message: string): void {
		const cleanMessage = this.filterClearCommand(message);
		this.terminal.write(cleanMessage);
	}

	private filterClearCommand(message: string): string {
		const clearCommandRegex = /\x1B\[H\x1B\[J/g;
		return message.replace(clearCommandRegex, '');
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

	private adjustHeightToParent(): void {
		const rightSideElement =
			this.terminalHistoryDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;

		if (rightSideElement) {
			let finalHeight: number;
			const heightCorrection = 280;
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
