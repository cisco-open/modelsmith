//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

import { AfterViewInit, Component, DestroyRef, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FitAddon } from '@xterm/addon-fit';
import { SearchAddon } from '@xterm/addon-search';
import { Terminal } from '@xterm/xterm';
import { ScriptFacadeService } from '../../../../../core/services';
import { ModelsFacadeService } from '../../../../../core/services/models-facade.service';
import { TerminalStylesService } from '../../services/terminal-styles.service';
import { TerminalWebSocketService } from '../../services/terminal-websocket.service';

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

	constructor(
		private destroyRef: DestroyRef,
		private terminalWebSocketService: TerminalWebSocketService,
		private terminalStylesService: TerminalStylesService
	) {}

	ngOnInit(): void {
		this.initializeTerminal();
		this.subscribeToWebSocketMessages();
	}

	ngAfterViewInit(): void {
		requestAnimationFrame(() => {
			this.adjustTerminalContainer();
		});
	}

	private initializeTerminal(): void {
		this.terminal = this.terminalStylesService.createTerminalInstance();
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);
		this.terminal.open(this.terminalDiv.nativeElement);
		this.setupResizeObserver();

		// Forward typed data to the WebSocket
		this.terminal.onData((data) => {
			this.terminalWebSocketService.sendMessage(data);
		});
	}

	private subscribeToWebSocketMessages(): void {
		this.terminalWebSocketService.messages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message: string) => {
			this.terminal.write(message);
		});
	}

	private setupResizeObserver(): void {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
		this.resizeObserver = new ResizeObserver(() => {
			this.adjustTerminalContainer();
		});
		this.resizeObserver.observe(this.terminalDiv.nativeElement);
	}

	private adjustTerminalContainer(): void {
		this.adjustHeightToParent();
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

	public search(value: string): void {
		this.searchAddon.findNext(value, {
			decorations: this.terminalStylesService.getSearchDecorationOptions()
		});
	}

	public clearSearch(): void {
		this.searchAddon.clearDecorations();
		this.searchAddon.findNext('');
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
