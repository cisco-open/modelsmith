import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TerminalWebSocketService {
	private socket: WebSocket | null = null;
	private socketPromise: Promise<WebSocket> | null = null;

	constructor() {}

	getSocket(): Promise<WebSocket> {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			return Promise.resolve(this.socket);
		}

		if (!this.socketPromise) {
			this.socketPromise = new Promise((resolve, reject) => {
				this.socket = new WebSocket(environment.terminalWebSocketUrl);

				this.socket.onopen = () => {
					console.log('Terminal WebSocket connected!');
					resolve(this.socket!);
				};

				this.socket.onerror = (error) => {
					console.error('Terminal WebSocket Error:', error);
					reject(error);
				};

				this.socket.onclose = () => {
					console.log('Terminal WebSocket closed.');
					this.socket = null;
					this.socketPromise = null;
				};
			});
		}

		return this.socketPromise;
	}
}
