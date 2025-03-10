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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'ms-card-selector',
	templateUrl: './ms-card-selector.component.html',
	styleUrls: ['./ms-card-selector.component.scss'],
	standalone: true,
	imports: [MatCardModule]
})
export class MsCardSelectorComponent {
	@Input() options: string[] = [];
	@Output() selectedOption = new EventEmitter<string | null>();

	activeCard: string | null = null;

	selectCard(option: string) {
		this.activeCard = this.activeCard === option ? null : option;
		this.selectedOption.emit(this.activeCard);
	}
}
