import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TerminalWebSocketService {
	private socket!: WebSocket;
	private messageSubject = new Subject<string>();
	private connectionStatus = new BehaviorSubject<boolean>(false);
	private isConnecting = false;

	private messagesHistory: string[] = []; // Buffer to store message history
	private readonly maxHistory = 1000; // Maximum number of messages to store

	// Observable streams
	public messages$ = this.messageSubject.asObservable();
	public connectionStatus$ = this.connectionStatus.asObservable();

	constructor(private ngZone: NgZone) {}

	/**
	 * Initialize the WebSocket connection
	 * Only connects if not already connected or connecting
	 */
	public connect(): void {
		if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
			console.log('WebSocket is already connected or connecting.');
			return;
		}

		if (this.isConnecting) {
			console.log('WebSocket connection is already in progress.');
			return;
		}

		this.isConnecting = true;

		const socketUrl = environment.terminalWebSocketUrl;
		this.socket = new WebSocket(socketUrl);

		this.socket.onopen = () => {
			console.log('Terminal WebSocket connected!');
			this.ngZone.run(() => this.connectionStatus.next(true));
			this.isConnecting = false;
		};

		this.socket.onerror = (error) => {
			console.error('Terminal WebSocket Error:', error);
			this.ngZone.run(() => this.connectionStatus.next(false));
			this.isConnecting = false;
		};

		this.socket.onmessage = (event) => {
			const data = event.data;
			this.ngZone.run(() => {
				this.messagesHistory.push(data);
				if (this.messagesHistory.length > this.maxHistory) {
					this.messagesHistory.shift();
				}
				this.messageSubject.next(data);
			});
		};

		this.socket.onclose = () => {
			console.log('Terminal WebSocket closed.');
			this.ngZone.run(() => this.connectionStatus.next(false));
			this.isConnecting = false;
		};
	}

	/**
	 * Send a message/command to the WebSocket server
	 * @param message The command or data to send
	 */
	public sendMessage(message: string): void {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(message);
		} else {
			console.error('WebSocket is not open. Unable to send message:', message);
		}
	}

	// Example method to send a clear command
	public clearScreen(): void {
		this.sendMessage('clear\r');
	}

	/**
	 * Close the WebSocket connection
	 */
	public closeConnection(): void {
		if (this.socket) {
			this.socket.close();
			console.log('WebSocket connection closed by client.');
		}
	}

	/**
	 * Manually reconnect the WebSocket
	 */
	public reconnect(): void {
		this.closeConnection();
		this.connect();
	}

	/**
	 * Retrieve the buffered message history
	 * @returns An array of past messages
	 */
	public getHistory(): string[] {
		return [...this.messagesHistory];
	}
}