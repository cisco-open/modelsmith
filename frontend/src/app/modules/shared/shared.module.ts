import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import {
	MAT_SELECTSEARCH_DEFAULT_OPTIONS,
	MatSelectSearchOptions,
	NgxMatSelectSearchModule
} from 'ngx-mat-select-search';
import { MsBackgroundGradientComponent } from './components/ms-background-gradient/ms-background-gradient.component';
import { MsCardSelectorComponent } from './components/ms-card-selector/ms-card-selector.component';
import { MsEmptyStateComponent } from './components/ms-empty-state/ms-empty-state.component';
import { MsFileUploadComponent } from './components/ms-file-upload/ms-file-upload.component';
import { MsFooterComponent } from './components/ms-footer/ms-footer.component';
import { MsHeaderComponent } from './components/ms-header/ms-header.component';
import { MsLineChartComponent } from './components/ms-line-chart/ms-line-chart.component';
import { ChartToolsGlobalSignalsService } from './components/ms-line-chart/services/chart-tools-global-signals.service';
import { MsMainLayoutComponent } from './components/ms-main-layout/ms-main-layout.component';
import { MsPanelParametersComponent } from './components/ms-panel-parameters/ms-panel-parameters.component';
import { MsSidenavItemComponent } from './components/ms-sidenav-item/ms-sidenav-item.component';
import { MsSidenavComponent } from './components/ms-sidenav/ms-sidenav.component';
import { MsBannerComponent } from './components/ms-banner/ms-banner.component';
import { TerminalToolbarComponent } from './components/ms-terminal/components/terminal-toolbar/terminal-toolbar.component';
import { MsTerminalComponent } from './components/ms-terminal/ms-terminal.component';
import { MsUserNavigationComponent } from './components/ms-user-navigation/ms-user-navigation.component';
import { PasswordToggleDirective } from './directives/password-toggle.directive';
import { MsErrorMessageComponent } from './forms/components/ms-error-message/ms-error-message.component';
import { ErrorDisplayDirective } from './forms/directives/error-display.directive';
import { MaterialModule } from './modules/material.module';

const COMPONENTS = [
	MsCardSelectorComponent,
	MsErrorMessageComponent,
	MsFooterComponent,
	MsBackgroundGradientComponent,
	MsHeaderComponent,
	MsUserNavigationComponent,
	MsMainLayoutComponent,
	MsSidenavComponent,
	MsSidenavItemComponent,
	MsTerminalComponent,
	MsBannerComponent,
	TerminalToolbarComponent,
	MsFileUploadComponent,
	MsLineChartComponent,
	MsPanelParametersComponent,
	MsEmptyStateComponent
];

const DIRECTIVES = [ErrorDisplayDirective, PasswordToggleDirective];

const SHARED_DECLARATIONS = [...COMPONENTS, ...DIRECTIVES];

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		NgChartsModule
	],
	declarations: [...SHARED_DECLARATIONS],
	providers: [
		{
			provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
			useValue: <MatSelectSearchOptions>{
				placeholderLabel: 'Search...',
				noEntriesFoundLabel: 'No matching entries found...'
			}
		},
		ChartToolsGlobalSignalsService
	],
	exports: [...SHARED_DECLARATIONS, MaterialModule, FormsModule, ReactiveFormsModule, NgxMatSelectSearchModule]
})
export class SharedModule {}
