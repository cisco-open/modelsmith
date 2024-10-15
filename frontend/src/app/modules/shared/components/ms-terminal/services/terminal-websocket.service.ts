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

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

const MAX_HISTORY_MESSAGES: number = 300;

@Injectable()
export class TerminalWebSocketService {
	private socket!: WebSocket;
	private messageSubject = new ReplaySubject<string>(MAX_HISTORY_MESSAGES);
	private connectionStatus = new BehaviorSubject<boolean>(false);
	private isConnecting = false;

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
			console.log('Terminal WebSocket is already connected or connecting.');
			return;
		}

		if (this.isConnecting) {
			console.log('Terminal WebSocket connection is already in progress.');
			return;
		}

		this.isConnecting = true;

		const socketUrl = environment.terminalWebSocketUrl;
		this.socket = new WebSocket(socketUrl);

		this.socket.onmessage = (event) => {
			const data = event.data;
			this.ngZone.run(() => {
				this.messageSubject.next(data);
			});
		};

		this.socket.onopen = () => {
			console.log('Terminal WebSocket connected!');
			this.ngZone.run(() => this.connectionStatus.next(true));
			this.isConnecting = false;

			this.sendMessage('CLIENT_READY');
		};

		this.socket.onerror = (error) => {
			console.error('Terminal WebSocket Error:', error);
			this.ngZone.run(() => this.connectionStatus.next(false));
			this.isConnecting = false;
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
			console.error('Terminal WebSocket is not open. Unable to send message:', message);
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
			console.log('Terminal WebSocket connection closed by client.');
		}
	}

	/**
	 * Manually reconnect the WebSocket
	 */
	public reconnect(): void {
		this.closeConnection();
		this.connect();
	}
}
