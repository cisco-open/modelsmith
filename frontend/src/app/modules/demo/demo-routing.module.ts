import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesList } from '../core/models/enums/routes-list.enum';
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

const routes: Routes = [
	{
		path: '',
		component: DemoComponent,
		children: [
			{
				path: '',
				redirectTo: RoutesList.DEMO.BUTTONS,
				pathMatch: 'full'
			},
			{
				path: RoutesList.DEMO.BUTTONS,
				component: ButtonsDemoComponent
			},
			{
				path: RoutesList.DEMO.FORM_FIELDS,
				component: FormFieldsDemoComponent
			},
			{
				path: RoutesList.DEMO.CHECKBOXES,
				component: CheckboxesDemoComponent
			},
			{
				path: RoutesList.DEMO.TYPOGRAPHY,
				component: TypographyDemoComponent
			},
			{
				path: RoutesList.DEMO.TABLE,
				component: TablesDemoComponent
			},
			{
				path: RoutesList.DEMO.ICONS,
				component: IconsDemoComponent
			},
			{
				path: RoutesList.DEMO.MENU,
				component: MenuDemoComponent
			},
			{
				path: RoutesList.DEMO.CARDS,
				component: CardsDemoComponent
			},
			{
				path: RoutesList.DEMO.CHIPS,
				component: ChipsDemoComponent
			},
			{
				path: RoutesList.DEMO.NOTIFICATIONS,
				component: NotificationsDemoComponent
			},
			{
				path: RoutesList.DEMO.WIZARD,
				component: WizardDemoComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DemoRoutingModule {}
