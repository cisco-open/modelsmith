//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { DialogConfig, DialogService } from '../../../../core/components/ms-dialog';

@Injectable({
	providedIn: 'root'
})
export class TerminalDialogService {
	constructor(private dialogService: DialogService) {}

	/**
	 * We are using dynamic imports here (lazy loading) to avoid circular dependency errors.
	 * MsTerminalFullscreenDialogComponent and MsTerminalToolbarComponent were causing circular
	 * dependencies due to the way they interact. To solve this issue, the fullscreen dialog
	 * component is being imported only when needed.
	 */
	async openFullScreenDialog(isFullscreen: boolean): Promise<void> {
		if (isFullscreen) {
			return;
		}

		const { MsTerminalFullscreenDialogComponent } = await import(
			'../components/ms-terminal-fullscreen-dialog/ms-terminal-fullscreen-dialog.component'
		);

		document.body.classList.add('no-scroll');
		const fullscreenDialog = this.dialogService.open(MsTerminalFullscreenDialogComponent, {
			showHeader: false,
			showFooter: false,
			showSaveButton: false,
			width: '100vw',
			height: '100vh'
		} as DialogConfig);

		fullscreenDialog
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				document.body.classList.remove('no-scroll');
			});
	}

	/**
	 * Similarly, we are dynamically importing the messages history dialog component
	 * to avoid introducing circular dependencies between components.
	 */
	async openMessagesHistoryDialog(): Promise<void> {
		const { MsTerminalMessagesHistoryDialogComponent } = await import(
			'../components/ms-terminal-messages-history-dialog/ms-terminal-messages-history-dialog.component'
		);

		this.dialogService.open(MsTerminalMessagesHistoryDialogComponent, {
			title: 'Terminal history',
			showSaveButton: false,
			width: '60vw',
			height: '75vh'
		} as DialogConfig);
	}
}
