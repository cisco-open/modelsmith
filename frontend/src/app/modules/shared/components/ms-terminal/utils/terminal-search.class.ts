import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Terminal } from 'xterm';
import { TerminalMessage } from '../models/terminal-message.interface';
import { arraysAreEqual, getTerminalLines } from './terminal.utils';

interface TerminalSearchConfig {
	caseSensitive?: boolean;
	debounceTimeMs?: number;
}

export class TerminalSearch {
	public searchControl: FormControl = new FormControl('');
	private caseSensitive: boolean;
	private debounceTimeMs: number;
	private worker: Worker | null = null;

	constructor(
		private terminal: Terminal,
		config?: TerminalSearchConfig
	) {
		const defaultConfig = {
			caseSensitive: false,
			debounceTimeMs: 300
		};

		const finalConfig = { ...defaultConfig, ...config };

		this.caseSensitive = finalConfig.caseSensitive!;
		this.debounceTimeMs = finalConfig.debounceTimeMs!;
		this.searchControl = new FormControl('');
	}

	public initialize(messages: TerminalMessage[]): void {
		this.processMessagesWithWorker(messages, '');
		this.setupSearch(messages);
	}

	private setupSearch(messages: TerminalMessage[]): void {
		this.searchControl.valueChanges.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchTerm) => {
			this.processMessagesWithWorker(messages, searchTerm || '');
		});
	}

	private processMessagesWithWorker(messages: TerminalMessage[], searchTerm: string): void {
		if (!this.worker) {
			this.worker = new Worker(new URL('./message-formatter.worker.ts', import.meta.url), { type: 'module' });

			this.worker.onmessage = ({ data }: MessageEvent<string[]>) => {
				this.displayMessagesInTerminal(data);
			};
		}

		this.worker.postMessage({
			messages,
			searchTerm,
			caseSensitive: this.caseSensitive
		});
	}

	private displayMessagesInTerminal(formattedMessages: string[]): void {
		const currentMessages = getTerminalLines(this.terminal.buffer.active);

		if (formattedMessages.length !== currentMessages.length || !arraysAreEqual(formattedMessages, currentMessages)) {
			this.terminal.clear();
			formattedMessages.forEach((message) => {
				this.writeToTerminal(message);
			});

			this.terminal.clearSelection();
		}
	}

	private writeToTerminal(message: string): void {
		const lines = message.split('\n');
		lines.forEach((line) => {
			this.terminal.writeln(line);
		});
	}

	public terminateWorker(): void {
		if (this.worker) {
			this.worker.terminate();
			this.worker = null;
		}
	}
}
