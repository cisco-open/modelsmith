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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MsCardSelectorComponent } from '../shared/standalone/ms-card-selector/ms-card-selector.component';
import { DrawerService, MsDrawerComponent } from '../shared/standalone/ms-drawer';
import { ButtonsDemoComponent } from './components/buttons-demo/buttons-demo.component';
import { CardsDemoComponent } from './components/cards-demo/cards-demo.component';
import { CheckboxesDemoComponent } from './components/checkboxes-demo/checkboxes-demo.component';
import { ChipsDemoComponent } from './components/chips-demo/chips-demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DrawerBasicDemoComponent } from './components/drawer-demo/drawer-basic-demo/drawer-basic-demo.component';
import { DrawerDemoComponent } from './components/drawer-demo/drawer-demo.component';
import { DrawerWithAlternativeActionsTemplateComponent } from './components/drawer-demo/drawer-with-alternative-actions-template/drawer-with-alternative-actions-template.component';
import { DrawerWithAlternativeHeaderTemplateComponent } from './components/drawer-demo/drawer-with-alternative-header-template/drawer-with-alternative-header-template.component';
import { DrawerWithButtonsActionsComponent } from './components/drawer-demo/drawer-with-buttons-actions/drawer-with-buttons-actions.component';
import { DrawerWithCustomizableWidthComponent } from './components/drawer-demo/drawer-with-customizable-width/drawer-with-customizable-width.component';
import { DrawerWithDisabledButtonsActionsComponent } from './components/drawer-demo/drawer-with-disabled-buttons-actions/drawer-with-disabled-buttons-actions.component';
import { DrawerWithInjectedDataComponent } from './components/drawer-demo/drawer-with-injected-data/drawer-with-injected-data.component';
import { DrawerWithOnlyOneButtonComponent } from './components/drawer-demo/drawer-with-only-one-button/drawer-with-only-one-button.component';
import { FormFieldsDemoComponent } from './components/form-fields-demo/form-fields-demo.component';
import { IconsDemoComponent } from './components/icons-demo/icons-demo.component';
import { MenuDemoComponent } from './components/menu-demo/menu-demo.component';
import { NotificationsDemoComponent } from './components/notifications-demo/notifications-demo.component';
import { TablesDemoComponent } from './components/tables-demo/tables-demo.component';
import { TypographyDemoComponent } from './components/typography-demo/typography-demo.component';
import { WizardDemoComponent } from './components/wizard-demo/wizard-demo.component';
import { DemoRoutingModule } from './demo-routing.module';

@NgModule({
	declarations: [
		DemoComponent,
		ButtonsDemoComponent,
		TablesDemoComponent,
		TypographyDemoComponent,
		IconsDemoComponent,
		CardsDemoComponent,
		FormFieldsDemoComponent,
		WizardDemoComponent,
		ChipsDemoComponent,
		CheckboxesDemoComponent,
		MenuDemoComponent,
		NotificationsDemoComponent,
		DrawerDemoComponent,
		DrawerBasicDemoComponent,
		DrawerWithInjectedDataComponent,
		DrawerWithAlternativeHeaderTemplateComponent,
		DrawerWithDisabledButtonsActionsComponent,
		DrawerWithOnlyOneButtonComponent,
		DrawerWithAlternativeActionsTemplateComponent,
		DrawerWithButtonsActionsComponent,
		DrawerWithCustomizableWidthComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		DemoRoutingModule,
		MsCardSelectorComponent,
		MsDrawerComponent,
		MatIconModule,
		MatStepperModule,
		MatDividerModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatTableModule,
		MatCardModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatCheckboxModule,
		MatSlideToggleModule
	],
	providers: [DrawerService]
})
export class DemoModule {}
