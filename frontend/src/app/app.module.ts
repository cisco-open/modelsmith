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

import { NgModule, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { MaterialModule } from './modules/shared/modules/material.module';
import { metaReducers } from './state/app.metareducers';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		AppRoutingModule,
		MaterialModule,
		StoreModule.forRoot({}, { metaReducers }),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: isDevMode()
		}),
		EffectsModule.forRoot([])
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
