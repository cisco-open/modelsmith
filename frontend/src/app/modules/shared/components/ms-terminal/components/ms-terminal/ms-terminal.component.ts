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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchAddon } from '@xterm/addon-search';
import { firstValueFrom, skip, take } from 'rxjs';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { KeyValue } from '../../../../../../services/client/models/key-value/key-value.interface-dto';
import { ScriptDetails } from '../../../../../../services/client/models/script/script-details.interface-dto';
import { ModelsActions } from '../../../../../../state/core/models/models.actions';
import { TerminalActions } from '../../../../../../state/core/terminal';
import { ScriptFacadeService, TerminalFacadeService, WebsocketService } from '../../../../../core/services';
import { ModelsFacadeService } from '../../../../../core/services/models-facade.service';
import { AlgorithmType, TrainAlgorithmsEnum } from '../../../../../model-compression/models/enums/algorithms.enum';
import { isScriptActive } from '../../../../../model-compression/models/enums/script-status.enum';
import { TerminalMessage } from '../../models/terminal-message.interface';
import { formatMessageByType } from '../../utils/terminal.utils';
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

	private messagesBuffer: TerminalMessage[] = [];
	private displayWebSocketMessages = false;

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

	private currentLine = '';
	private promptString = '> ';
	private terminalEnabled: boolean = true;

	constructor(
		private websocketService: WebsocketService,
		private terminalFacadeService: TerminalFacadeService,
		private scriptFacadeService: ScriptFacadeService,
		private modelsFacadeService: ModelsFacadeService
	) {
		this.listenToIncommingMessages();
		this.listenToScriptStateChanges();
	}

	private listenToIncommingMessages() {
		this.websocketService.terminalMessages$.pipe(untilDestroyed(this)).subscribe((message: TerminalMessage) => {
			if (message?.data === 'Script execution ended successfully.') {
				this.updateModelsListOnTrainAlgorithmCompletion();
			}

			const formattedMessage = formatMessageByType(message);
			if (this.displayWebSocketMessages) {
				this.writeToTerminal(formattedMessage);
			} else {
				this.messagesBuffer.push(message);
			}
		});
	}

	private listenToScriptStateChanges() {
		this.scriptFacadeService.scriptStatus$.pipe(untilDestroyed(this)).subscribe((state) => {
			this.terminalEnabled = !isScriptActive(state);
		});
	}

	ngOnInit(): void {
		this.initializeTerminal();
		this.loadLatestMessages();
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

	private writeToTerminal(message: string): void {
		const lines = message.split('\n');
		lines.forEach((line) => {
			this.terminal.writeln(line);
		});
	}

	private loadLatestMessages() {
		this.terminalFacadeService.messages$.pipe(skip(1), take(1)).subscribe((messages: TerminalMessage[]) => {
			messages.forEach((messageObj: TerminalMessage) => {
				const formattedMessage = formatMessageByType(messageObj);
				this.writeToTerminal(formattedMessage);
			});

			this.messagesBuffer.forEach((bufferedMessageObj: TerminalMessage) => {
				const formattedMessage = formatMessageByType(bufferedMessageObj);
				this.writeToTerminal(formattedMessage);
			});
			this.messagesBuffer = [];
			this.displayWebSocketMessages = true;

			if (this.terminalEnabled) {
				this.showPrompt();
			}
		});
		this.terminalFacadeService.dispatch(TerminalActions.getLatestMessages());
	}

	private initializeTerminal(): void {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.loadAddon(this.searchAddon);

		this.terminal.open(this.terminalDiv.nativeElement);

		this.setupResizeObserver();
		this.setupKeyboardHandling();
	}

	private setupKeyboardHandling(): void {
		this.terminal.onKey(({ key, domEvent }) => {
			if (!this.terminalEnabled) {
				return;
			}

			const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

			if (domEvent.keyCode === 13) {
				this.handleEnterKey();
			} else if (domEvent.keyCode === 8) {
				if (this.currentLine.length > 0) {
					this.currentLine = this.currentLine.slice(0, -1);
					this.terminal.write('\b \b');
				}
			} else if (printable) {
				this.currentLine += key;
				this.terminal.write(key);
			}
		});
	}
	private handleEnterKey(): void {
		this.terminal.writeln('');
		if (this.currentLine.trim().length > 0) {
			this.executeCommand(this.currentLine);
		}
		this.currentLine = '';
		this.showPrompt();
	}

	private showPrompt(): void {
		this.terminal.write(this.promptString);
	}

	private executeCommand(command: string): void {
		this.terminal.writeln(`${command}`);
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

	private async updateModelsListOnTrainAlgorithmCompletion() {
		const scriptDetails: ScriptDetails = await firstValueFrom(this.scriptFacadeService.scriptDetails$);
		const algorithmMapping: KeyValue<AlgorithmType> = {
			[TrainAlgorithmsEnum.MACHINE_UNLEARNING_TRAIN]: AlgorithmType.MACHINE_UNLEARNING,
			[TrainAlgorithmsEnum.PRUNING_TRAIN]: AlgorithmType.PRUNING,
			[TrainAlgorithmsEnum.QUANTIZATION_TRAIN]: AlgorithmType.QUANTIZATION
		};

		if (scriptDetails.algKey in algorithmMapping) {
			this.modelsFacadeService.dispatch(
				ModelsActions.getModelsList({ algorithmType: algorithmMapping[scriptDetails.algKey] })
			);
			this.modelsFacadeService.dispatch(
				ModelsActions.getModelMetadata({
					algorithmType: algorithmMapping[scriptDetails.algKey],
					modelName: scriptDetails.model
				})
			);
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
	}
}
