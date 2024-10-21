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
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FitAddon } from '@xterm/addon-fit';
import { SearchAddon } from '@xterm/addon-search';
import { Terminal } from '@xterm/xterm';
import { delay, filter } from 'rxjs';
import { ScriptActions } from '../../../../../../state/core/script';
import { ScriptFacadeService } from '../../../../../core/services';
import { isScriptActive } from '../../../../../model-compression/models/enums/script-status.enum';
import { MsTooltipPanelDirective } from '../../../../directives/ms-tooltip-panel/ms-tooltip-panel.directive';
import { isNilOrEmptyString } from '../../../../shared.utils';
import {
	DIALOG_DATA,
	DialogConfig,
	DialogRef,
	DialogService,
	DialogStatus,
	MsDialogComponent
} from '../../../ms-dialog';
import { TerminalWebSocketService } from '../../services/terminal-websocket.service';
import { MsTerminalMessagesHistoryDialogComponent } from '../ms-terminal-messages-history-dialog/ms-terminal-messages-history-dialog.component';
import { MsTerminalComponent } from '../ms-terminal/ms-terminal.component';

@UntilDestroy({})
@Component({
	selector: 'ms-terminal-fullscreen-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MsDialogComponent,
		MsTerminalComponent,
		MatButtonModule,
		MatTooltipModule,
		MatIconModule,
		MsTooltipPanelDirective,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule
	],
	templateUrl: './ms-terminal-fullscreen-dialog.component.html',
	styleUrl: './ms-terminal-fullscreen-dialog.component.scss'
})
export class MsTerminalFullscreenDialogComponent {
	@ViewChild('terminal', { static: true }) terminalDiv!: ElementRef;

	isScriptActive: boolean = false;

	searchFormControl = new FormControl<string>('');

	private terminal: Terminal = new Terminal({
		cursorBlink: true,
		theme: {
			background: '#D0D4D9',
			foreground: '#000000',
			cursor: '#000000',
			selectionBackground: '#FFDD00',
			selectionForeground: '#000000'
		},
		allowProposedApi: true
	});

	private fitAddon: FitAddon = new FitAddon();
	private searchAddon = new SearchAddon();
	private resizeObserver?: ResizeObserver;

	constructor(
		@Inject(DIALOG_DATA) public dialogConfig: DialogConfig,
		private dialogRef: DialogRef,
		private dialogService: DialogService,
		private terminalWebSocketService: TerminalWebSocketService,
		private scriptFacadeService: ScriptFacadeService
	) {
		document.body.classList.add('no-scroll');
	}

	ngOnInit(): void {
		this.listenToScriptStateChanges();
		this.listenToSearchFormControlChanges();

		this.initializeTerminal();
		this.subscribeToWebSocketMessages();
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

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.adjustHeightToParent();
		}, 0);
		this.fitTerminalToContainer();
	}

	closeDialog() {
		this.dialogRef.close({ status: DialogStatus.CLOSE });
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	openTerminalMessagesHistoryDialog() {
		this.dialogService.open(MsTerminalMessagesHistoryDialogComponent, {
			title: 'Terminal history',
			showSaveButton: false,
			width: '60vw',
			height: '75vh'
		} as DialogConfig);
	}

	public search(value: string) {
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
	}

	ctaStopScript() {
		this.scriptFacadeService.dispatch(ScriptActions.stopScript());
	}

	private subscribeToWebSocketMessages(): void {
		this.terminalWebSocketService.messages$.pipe(untilDestroyed(this)).subscribe((message: string) => {
			this.terminal.write(message);
		});
	}

	private initializeTerminal(): void {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);

		this.terminal.open(this.terminalDiv.nativeElement);

		this.setupResizeObserver();

		this.terminal.onData((data) => {
			this.terminalWebSocketService.sendMessage(data);
		});
	}

	private setupResizeObserver(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}

		this.resizeObserver = new ResizeObserver(() => this.fitTerminalToContainer());
		this.resizeObserver.observe(this.terminalDiv.nativeElement);
	}

	private fitTerminalToContainer(): void {
		this.fitAddon.fit();
	}

	private adjustHeightToParent(): void {
		const rightSideElement = this.terminalDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;

		if (rightSideElement) {
			let finalHeight: number;
			const heightCorrection = 100;
			finalHeight = rightSideElement.offsetHeight - heightCorrection;
			this.terminalDiv.nativeElement.style.height = `${finalHeight}px`;
		}
	}

	clearTerminal() {
		this.terminalWebSocketService.clearScreen();
	}

	scrollToTopTerminal() {
		this.terminal.scrollToTop();
	}

	scrollToBottomTerminal() {
		this.terminal.scrollToBottom();
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		this.terminal.dispose();
	}
}
