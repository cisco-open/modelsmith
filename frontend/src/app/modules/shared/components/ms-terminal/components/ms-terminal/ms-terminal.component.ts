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

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SearchAddon } from '@xterm/addon-search';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { environment } from '../../../../../../../environments/environment';
import { TerminalActions } from '../../../../../../state/core/terminal';
import { ScriptFacadeService, TerminalFacadeService } from '../../../../../core/services';
import { ModelsFacadeService } from '../../../../../core/services/models-facade.service';
import { MsTerminalToolbarComponent } from '../ms-terminal-toolbar/ms-terminal-toolbar.component';

@UntilDestroy()
@Component({
	selector: 'ms-terminal',
	templateUrl: './ms-terminal.component.html',
	styleUrls: ['./ms-terminal.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [MsTerminalToolbarComponent],
	providers: [ScriptFacadeService, ModelsFacadeService]
})
export class MsTerminalComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('terminal', { static: true }) terminalDiv!: ElementRef;

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
	private socket!: WebSocket;

	constructor(private terminalFacadeService: TerminalFacadeService) {}

	ngOnInit(): void {
		this.initializeTerminal();
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.adjustHeightToParent();
		}, 0);
		this.fitTerminalToContainer();
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

	private async initializeTerminal(): Promise<void> {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);

		this.terminal.open(this.terminalDiv.nativeElement);

		this.setupResizeObserver();
		this.setupWebSocket();
	}

	private setupWebSocket(): void {
		const socketUrl = `${environment.terminalWebSocketUrl}`;
		this.socket = new WebSocket(socketUrl);

		this.socket.onopen = () => {
			console.log('Terminal WebSocket connected!');
		};

		this.socket.onerror = (error) => {
			console.error('Terminal WebSocket Error:', error);
		};

		this.socket.onmessage = (event) => {
			this.terminal.write(event.data);
		};

		this.socket.onclose = () => {
			console.log('Terminal WebSocket closed');
		};

		this.terminal.onData((data) => {
			this.socket.send(data);
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
		this.terminalFacadeService.dispatch(TerminalActions.postClearHistory());
		this.terminal.clear();
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
