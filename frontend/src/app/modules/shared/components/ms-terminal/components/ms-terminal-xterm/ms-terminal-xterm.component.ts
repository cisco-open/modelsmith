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

import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FitAddon } from '@xterm/addon-fit';
import { SearchAddon } from '@xterm/addon-search';
import { Terminal } from '@xterm/xterm';
import { ScriptFacadeService } from '../../../../../core/services';
import { ModelsFacadeService } from '../../../../../core/services/models-facade.service';
import { TerminalWebSocketService } from '../../services/terminal-websocket.service';

@UntilDestroy({})
@Component({
	selector: 'ms-terminal-xterm',
	standalone: true,
	imports: [],
	templateUrl: './ms-terminal-xterm.component.html',
	styleUrl: './ms-terminal-xterm.component.scss',
	providers: [ScriptFacadeService, ModelsFacadeService]
})
export class MsTerminalXtermComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('terminal', { static: true }) terminalDiv!: ElementRef;
	@Input() options: any;

	private terminal!: Terminal;
	private fitAddon = new FitAddon();
	private searchAddon = new SearchAddon();
	private resizeObserver?: ResizeObserver;

	constructor(private terminalWebSocketService: TerminalWebSocketService) {}

	ngOnInit(): void {
		this.initializeTerminal();
		this.subscribeToWebSocketMessages();
	}

	ngAfterViewInit(): void {
		this.adjustHeightToParent();
		this.fitTerminalToContainer();
	}

	private initializeTerminal(): void {
		this.terminal = new Terminal({
			cursorBlink: true,
			theme: {
				background: '#D0D4D9',
				foreground: '#000000',
				cursor: '#000000',
				selectionBackground: '#FFDD00',
				selectionForeground: '#000000'
			},
			allowProposedApi: true,
			...this.options
		});

		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);
		this.terminal.open(this.terminalDiv.nativeElement);
		this.setupResizeObserver();

		this.terminal.onData((data) => {
			this.terminalWebSocketService.sendMessage(data);
		});
	}

	private subscribeToWebSocketMessages(): void {
		this.terminalWebSocketService.messages$.pipe(untilDestroyed(this)).subscribe((message: string) => {
			this.terminal.write(message);
		});
	}

	private setupResizeObserver(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
		this.resizeObserver = new ResizeObserver(() => {
			this.fitTerminalToContainer();
			this.adjustHeightToParent();
		});
		this.resizeObserver.observe(this.terminalDiv.nativeElement);
	}

	private fitTerminalToContainer(): void {
		this.fitAddon.fit();
	}

	private adjustHeightToParent(): void {
		const rightSideElement = this.terminalDiv.nativeElement.parentElement.parentElement.parentElement.parentElement;

		if (rightSideElement) {
			this.terminalDiv.nativeElement.style.height = 'auto';

			const availableHeight = rightSideElement.offsetHeight;
			const heightCorrection = 100;
			const finalHeight = availableHeight - heightCorrection;

			this.terminalDiv.nativeElement.style.height = `${finalHeight}px`;
		}
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		this.terminal.dispose();
	}

	// Expose methods for search, clear, scroll, etc.
	public search(value: string): void {
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

	public clearSearch(): void {
		this.searchAddon.clearDecorations();
	}

	public clearTerminal(): void {
		this.terminal.clear();
	}

	public scrollToTop(): void {
		this.terminal.scrollToTop();
	}

	public scrollToBottom(): void {
		this.terminal.scrollToBottom();
	}
}
