import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { CoreModule } from './modules/core/core.module';
import { MaterialModule } from './modules/shared/modules/material.module';
import { metaReducers } from './state/app.metareducers';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		importProvidersFrom(
			CoreModule,
			MaterialModule,
			StoreModule.forRoot({}, { metaReducers }),
			StoreDevtoolsModule.instrument({
				maxAge: 25,
				logOnly: isDevMode(),
				connectInZone: true
			}),
			EffectsModule.forRoot([])
		),
		provideClientHydration()
	]
};
