import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { skip, take } from 'rxjs';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { TerminalActions } from '../../../../state/core/terminal/terminal.actions';
import { NotificationTypes } from '../../../core/models/enums/snackbar-types.enum';
import { TerminalMessage } from '../../../core/models/interfaces/terminal-message.interface';
import { TerminalFacadeService } from '../../../core/services/terminal-facade.service';
import { WebsocketService } from '../../../core/services/websocket.service';

@UntilDestroy()
@Component({
	selector: 'ms-terminal',
	templateUrl: './ms-terminal.component.html',
	styleUrls: ['./ms-terminal.component.scss'],
	encapsulation: ViewEncapsulation.None
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
		private terminalFacadeService: TerminalFacadeService
	) {
		this.websocketService.terminalMessages$.pipe(untilDestroyed(this)).subscribe((message: TerminalMessage) => {
			const formattedMessage = this.formatMessageByType(message);
			if (this.displayWebSocketMessages) {
				formattedMessage.split('\n').forEach((line) => {
					this.terminal.writeln(line);
				});
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

	private loadLatestMessages() {
		this.terminalFacadeService.messages$.pipe(skip(1), take(1)).subscribe((messages: TerminalMessage[]) => {
			messages.forEach((messageObj: TerminalMessage) => {
				const formattedMessage = this.formatMessageByType(messageObj);
				formattedMessage.split('\n').forEach((line) => {
					this.terminal.writeln(line);
				});
			});

			this.messagesBuffer.forEach((bufferedMessageObj: TerminalMessage) => {
				const formattedMessage = this.formatMessageByType(bufferedMessageObj);
				formattedMessage.split('\n').forEach((line) => {
					this.terminal.writeln(line);
				});
			});
			this.messagesBuffer = [];
			this.displayWebSocketMessages = true;
		});
		this.terminalFacadeService.dispatch(TerminalActions.getLatestMessages());
	}

	private formatMessageByType(message: TerminalMessage): string {
		let colorCode = '';
		switch (message.type) {
			case NotificationTypes.ERROR:
				colorCode = '\x1b[38;5;124m';
				break;
			case NotificationTypes.SUCCESS:
				colorCode = '\x1b[38;5;22m';
				break;
			case NotificationTypes.WARNING:
				colorCode = '\x1b[38;5;136m';
				break;
			case NotificationTypes.INFO:
			default:
				colorCode = '\x1b[38;5;0m';
				break;
		}

		return `${colorCode}${message.data}\x1b[0m`;
	}

	private initializeTerminal(): void {
		this.terminal.loadAddon(this.fitAddon);
		this.terminal.open(this.terminalDiv.nativeElement);
		this.terminal.writeln('Welcome to Modelsmith terminal!\r\n');

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

	// Hack to fit on full height.
	private adjustHeightToParent(): void {
		const parentElement = this.terminalDiv.nativeElement.parentElement.parentElement.parentElement;
		if (parentElement && parentElement.parentElement) {
			const heightCorrection = 170;
			const parentHeight = parentElement.parentElement.offsetHeight - heightCorrection;
			this.terminalDiv.nativeElement.style.height = `${parentHeight}px`;
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
