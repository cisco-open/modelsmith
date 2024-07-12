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

import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MsUserNavigationComponent } from '../ms-user-navigation/ms-user-navigation.component';

@Component({
	selector: 'ms-header',
	templateUrl: './ms-header.component.html',
	styleUrls: ['./ms-header.component.scss'],
	standalone: true,
	imports: [
		MatIconModule,
		MsUserNavigationComponent,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule
	]
})
export class MsHeaderComponent {
	search = new FormControl();
}
