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
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MsBackgroundGradientComponent } from '../shared/standalone/ms-background-gradient/ms-background-gradient.component';
import { MsFooterComponent } from '../shared/standalone/ms-footer/ms-footer.component';
import { MsHeaderComponent } from '../shared/standalone/ms-header/ms-header.component';
import { ModeSelectComponent } from './components/mode-select/mode-select.component';
import { ModeSelectRoutingModule } from './mode-select-routing.module';

@NgModule({
	declarations: [ModeSelectComponent],
	imports: [
		ModeSelectRoutingModule,
		CommonModule,
		MsBackgroundGradientComponent,
		MsFooterComponent,
		MsHeaderComponent,
		MatCheckboxModule,
		MatButtonModule
	]
})
export class ModeSelectModule {}
