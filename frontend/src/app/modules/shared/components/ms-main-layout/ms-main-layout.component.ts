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

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsFooterComponent } from '../ms-footer/ms-footer.component';
import { MsHeaderComponent } from '../ms-header/ms-header.component';
import { MsSidenavComponent } from '../ms-sidenav/ms-sidenav.component';

@Component({
	selector: 'ms-main-layout',
	templateUrl: './ms-main-layout.component.html',
	styleUrls: ['./ms-main-layout.component.scss'],
	standalone: true,
	imports: [MsFooterComponent, MsHeaderComponent, MsSidenavComponent, RouterModule]
})
export class MsMainLayoutComponent {}
