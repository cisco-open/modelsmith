import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ButtonsDemoComponent } from './components/buttons-demo/buttons-demo.component';
import { CardsDemoComponent } from './components/cards-demo/cards-demo.component';
import { CheckboxesDemoComponent } from './components/checkboxes-demo/checkboxes-demo.component';
import { ChipsDemoComponent } from './components/chips-demo/chips-demo.component';
import { DemoComponent } from './components/demo/demo.component';
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
		NotificationsDemoComponent
	],
	imports: [RouterModule, CommonModule, SharedModule, DemoRoutingModule]
})
export class DemoModule {}
