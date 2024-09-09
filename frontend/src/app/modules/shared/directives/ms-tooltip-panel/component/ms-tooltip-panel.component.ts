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

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { tooltipStateAnimation } from '../animations/ms-tooltip-panel.animations';

@Component({
	selector: 'ms-tooltip-panel',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatButtonModule],
	templateUrl: './ms-tooltip-panel.component.html',
	styleUrl: './ms-tooltip-panel.component.scss',
	animations: [tooltipStateAnimation]
})
export class MsTooltipPanelComponent {
	@Input() contentTemplate?: TemplateRef<any>;
	@Input() position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	@Input() showCloseButton = false;
	@Input() state: 'hidden' | 'visible' = 'hidden';

	@Output() close = new EventEmitter<void>();

	triggerClose() {
		this.state = 'hidden';
		setTimeout(() => this.close.emit(), 150);
	}
}
