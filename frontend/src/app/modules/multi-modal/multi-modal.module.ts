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
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MsPanelParametersComponent } from '../shared/components/ms-panel-parameters/ms-panel-parameters.component';
import { MsTerminalXtermWithToolbarComponent } from '../shared/components/ms-terminal/components/ms-terminal-xterm-with-toolbar/ms-terminal-xterm-with-toolbar.component';
import { MultiModalComponent } from './components/multi-modal/multi-modal.component';
import { MultiModalRoutingModule } from './multi-modal-routing.module';

@NgModule({
	declarations: [MultiModalComponent],
	imports: [
		CommonModule,
		MsPanelParametersComponent,
		MsTerminalXtermWithToolbarComponent,
		MultiModalRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule
	]
})
export class MultiModalModule {}
