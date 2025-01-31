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

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { delay, filter, take } from 'rxjs';
import { ScriptActions } from '../../../../../../state/core/script/script.actions';
import { PopoverRef } from '../../../../../core/components/ms-popover';
import { PopoverPosition } from '../../../../../core/components/ms-popover/models/enums/popover-position.enum';
import { PopoverService } from '../../../../../core/components/ms-popover/service/popover.service';
import { ScriptFacadeService } from '../../../../../core/services/script-facade.service';
import { isScriptActive } from '../../../../../model-compression/models/enums/script-status.enum';
import { isNil, isNilOrEmptyString } from '../../../../shared.utils';
import { TerminalDialogService } from '../../services/terminal-dialog.service';
import { TerminalWebSocketService } from '../../services/terminal-websocket.service';
import { MsTerminalToolbarSearchPopoverComponent } from '../ms-terminal-toolbar-search-popover/ms-terminal-toolbar-search-popover.component';

@Component({
	selector: 'ms-terminal-toolbar',
	templateUrl: './ms-terminal-toolbar.component.html',
	styleUrls: ['./ms-terminal-toolbar.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule
	],
	providers: [TerminalDialogService, PopoverService]
})
export class MsTerminalToolbarComponent implements OnInit, OnDestroy {
	@Input() isFullscreen = false;
	@Input() isScriptActive = false;
	@Input() popoverId: string = '';
	@Output() clearTerminal = new EventEmitter<void>();
	@Output() scrollToTopTerminal = new EventEmitter<void>();
	@Output() scrollToBottomTerminal = new EventEmitter<void>();
	@Output() searchTerminal = new EventEmitter<string>();
	@Output() disposeSearch = new EventEmitter<void>();
	@Output() exitFullscreen = new EventEmitter<void>();

	searchFormControl = new FormControl<string>('');
	searchPanelRef?: PopoverRef;

	constructor(
		private destroyRef: DestroyRef,
		private scriptFacadeService: ScriptFacadeService,
		private terminalWebSocketService: TerminalWebSocketService,
		private terminalDialogService: TerminalDialogService,
		private popoverService: PopoverService
	) {}

	ngOnInit(): void {
		this.listenToScriptStateChanges();
		this.listenToSearchFormControlChanges();
	}

	public clearTerminalScreen() {
		this.terminalWebSocketService.clearScreen();
	}

	public openPanel(origin: MatIconButton) {
		if (!isNil(this.searchPanelRef)) {
			return;
		}

		this.searchPanelRef = this.popoverService.open(
			MsTerminalToolbarSearchPopoverComponent,
			origin._elementRef,
			{
				position: !this.isFullscreen ? PopoverPosition.TOP : PopoverPosition.BOTTOM,
				width: '200px',
				height: '60px'
			},
			this.popoverId ?? ''
		);

		this.searchPanelRef.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data: any) => {
			this.searchTerminal.emit(data);
		});

		this.searchPanelRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(() => {
				this.searchPanelRef = undefined;
				this.disposeSearch.emit();
			});
	}

	private listenToSearchFormControlChanges(): void {
		this.searchFormControl.valueChanges
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				delay(300),
				filter((value: string | null): value is string => !isNilOrEmptyString(value))
			)
			.subscribe((value: string) => {
				this.searchTerminal.emit(value);
			});
	}

	private listenToScriptStateChanges(): void {
		this.scriptFacadeService.scriptStatus$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
			this.isScriptActive = isScriptActive(state);
		});
	}

	ctaStopScript() {
		this.scriptFacadeService.dispatch(ScriptActions.stopScript());
	}

	openTerminalMessagesHistoryDialog() {
		if (!isNil(this.searchPanelRef)) {
			this.searchPanelRef?.close();
		}

		this.terminalDialogService.openMessagesHistoryDialog();
	}

	openFullScreenMode() {
		if (this.isFullscreen) {
			this.exitFullscreen.emit();
			return;
		}

		this.searchPanelRef?.close();
		this.terminalDialogService.openFullScreenDialog(this.isFullscreen);
	}

	ngOnDestroy(): void {
		if (!isNil(this.searchPanelRef)) {
			this.searchPanelRef?.close();
		}
	}
}
