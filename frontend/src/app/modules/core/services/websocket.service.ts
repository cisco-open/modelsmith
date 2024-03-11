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

import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ScriptActions } from '../../../state/core/script/script.actions';
import { StatisticsActions } from '../../../state/core/statistics';
import { RECONNECT_DELAY } from '../models/constants/websocket.constants';
import { WebsocketMessageTopics } from '../models/enums/websocket-message-types.enum';
import { ChartsMessages } from '../models/interfaces/charts-messages.interface';
import { TerminalMessage } from '../models/interfaces/terminal-message.interface';
import { ScriptFacadeService } from './script-facade.service';
import { StatisticsFacadeService } from './statistics-facade.service';

@Injectable()
export class WebsocketService {
	private socket!: WebSocket;

	private terminalMessagesSubject = new Subject<TerminalMessage>();
	private chartsMessagesSubject = new Subject<ChartsMessages>();

	@HostListener('window:beforeunload', ['$event'])
	handleBeforeUnload() {
		this.close();
	}

	constructor(
		private scriptFacadeService: ScriptFacadeService,
		private statisticsFacadeService: StatisticsFacadeService
	) {
		this.connect();
	}

	private connect(): void {
		this.close();

		this.socket = new WebSocket(environment.websocketUrl);

		this.socket.onopen = () => {
			console.log('WebSocket connected!');
		};

		this.socket.onmessage = (message) => {
			const parsedMessage = JSON.parse(message.data);
			const { topic = '', data } = parsedMessage;

			switch (topic) {
				case WebsocketMessageTopics.TERMINAL:
					this.terminalMessagesSubject.next(data);
					break;
				case WebsocketMessageTopics.SCRIPT_STATUS:
					this.scriptFacadeService.dispatch(ScriptActions.updateScriptStatus({ status: data }));
					break;
				case WebsocketMessageTopics.STATISTICS:
					const { statistics } = data || {};
					this.statisticsFacadeService.dispatch(StatisticsActions.updateStatistics({ statistics }));
					break;
				default:
					if (topic.startsWith(WebsocketMessageTopics.CHARTS_PREFIX)) {
						this.chartsMessagesSubject.next({
							topic: topic,
							data: data
						} as ChartsMessages);
					} else {
						console.warn('Unknown message type:', topic);
					}
			}
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket Error:', error);
		};

		this.socket.onclose = (event) => {
			if (event.wasClean) {
				console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
			} else {
				console.error('Connection died');
			}
			timer(RECONNECT_DELAY).subscribe(() => this.connect());
		};
	}

	public get terminalMessages$(): Observable<TerminalMessage> {
		return this.terminalMessagesSubject.asObservable();
	}

	public get chartsMessages$(): Observable<ChartsMessages> {
		return this.chartsMessagesSubject.asObservable();
	}

	public send(data: string): void {
		if (this.socket && this.socket.readyState === this.socket.OPEN) {
			this.socket.send(data);
		}
	}

	public close(): void {
		if (this.socket && this.socket.readyState !== this.socket.CLOSED) {
			this.socket.close();
		}
	}
}
