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
import { TerminalMessage } from '../../models/terminal-message.interface';
import { formatMessageByType } from '../../utils/terminal.utils';
import { MsTerminalToolbarComponent } from '../terminal-toolbar/terminal-toolbar.component';

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
			cursor: '#000000'
		}
	});
	private fitAddon: FitAddon = new FitAddon();
	private resizeObserver?: ResizeObserver;

	constructor(
		private websocketService: WebsocketService,
		private terminalFacadeService: TerminalFacadeService,
		private scriptFacadeService: ScriptFacadeService,
		private modelsFacadeService: ModelsFacadeService
	) {
		this.listenToIncommingMessages();
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
		});
		this.terminalFacadeService.dispatch(TerminalActions.getLatestMessages());
	}

	private initializeTerminal(): void {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.open(this.terminalDiv.nativeElement);
		this.terminal.writeln('Welcome to ModelSmith terminal!\r\n');

		this.setupResizeObserver();
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
