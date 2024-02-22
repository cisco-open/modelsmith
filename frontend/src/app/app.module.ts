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
