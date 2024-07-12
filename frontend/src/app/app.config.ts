import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCoreServices } from './modules/core/core-services.provide';
import { provideCustomMaterialConfigs } from './modules/shared/material.providers';
import { provideBEServices } from './services/be-services.provide';
import { provideInterceptors } from './services/interceptors.provide';
import { provideGlobalStore } from './state/global-store.providers';

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom(BrowserAnimationsModule),
		provideRouter(routes),
		provideCustomMaterialConfigs(),
		provideGlobalStore(),
		provideBEServices(),
		provideCoreServices(),
		provideInterceptors(),
		provideClientHydration(),
		provideHttpClient(withInterceptorsFromDi())
	]
};
