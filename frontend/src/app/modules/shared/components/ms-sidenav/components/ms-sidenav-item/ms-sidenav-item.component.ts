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
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidenavItem } from '../../../../../core/models/interfaces/sidenav.interface';
import { PageRunningScriptSpiningIndicatorService } from '../../../../../core/services/page-running-script-spinning-indicator.service';
import { MsSpiningIndicatorComponent } from '../../../ms-spining-indicator/ms-spining-indicator.component';

@Component({
	selector: 'ms-sidenav-item',
	templateUrl: './ms-sidenav-item.component.html',
	styleUrls: ['./ms-sidenav-item.component.scss'],
	standalone: true,
	imports: [CommonModule, MatIconModule, MsSpiningIndicatorComponent, RouterModule]
})
export class MsSidenavItemComponent {
	@Input() item!: SidenavItem;
	@Input() itemStyle: 'accent' | 'grey' = 'accent';
	@Input() isExpanded = true;

	constructor(public pageRunningScriptSpiningIndicatorService: PageRunningScriptSpiningIndicatorService) {}
}
