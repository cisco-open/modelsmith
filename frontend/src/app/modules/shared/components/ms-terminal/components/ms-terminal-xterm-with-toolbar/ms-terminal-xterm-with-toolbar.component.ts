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

import { Component, ElementRef, OnDestroy, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PopoverManagerService } from '../../../../../core/components/ms-popover/service/popover-manager.service';
import { MsTerminalToolbarComponent } from '../ms-terminal-toolbar/ms-terminal-toolbar.component';
import { MsTerminalXtermComponent } from '../ms-terminal-xterm/ms-terminal-xterm.component';

@UntilDestroy()
@Component({
	selector: 'ms-terminal-xterm-with-toolbar',
	templateUrl: './ms-terminal-xterm-with-toolbar.component.html',
	styleUrls: ['./ms-terminal-xterm-with-toolbar.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	imports: [MsTerminalToolbarComponent, MsTerminalXtermComponent]
})
export class MsTerminalXtermWithToolbarComponent implements OnDestroy {
	@ViewChild('terminalWrapper') terminalWrapper!: ElementRef;

	private clickListener!: () => void;

	constructor(
		private renderer: Renderer2,
		private popoverManager: PopoverManagerService
	) {}

	ngOnInit() {
		this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
			this.handleClickOutside(event);
		});
	}

	handleClickOutside(event: Event): void {
		if (this.terminalWrapper && !this.terminalWrapper.nativeElement.contains(event.target)) {
			if (this.popoverManager.hasActivePopover('terminal-popover')) {
				this.popoverManager.closePopoverById('terminal-popover');
			}
		}
	}

	ngOnDestroy() {
		if (this.clickListener) {
			this.clickListener();
		}
	}
}
