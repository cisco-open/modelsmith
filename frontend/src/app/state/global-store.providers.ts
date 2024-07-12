import { EnvironmentProviders, importProvidersFrom, isDevMode } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { metaReducers } from './app.metareducers';
import { coreReducers } from './core';
import { AuthEffects } from './core/auth';
import { ChartsEffects } from './core/charts';
import { FileEffects } from './core/file';
import { ModelsEffects } from './core/models/models.effects';
import { ParametersEffects } from './core/parameters';
import { ScriptEffects } from './core/script';
import { StatisticsEffects } from './core/statistics';
import { TerminalEffects } from './core/terminal';

export function provideGlobalStore(): EnvironmentProviders[] {
	return [
		provideStoreDevtools({
			maxAge: 25,
			logOnly: isDevMode(),
			connectInZone: true
		}),
		importProvidersFrom([
			StoreModule.forRoot({}, { metaReducers }),
			EffectsModule.forRoot([]),
			StoreModule.forFeature('core', coreReducers)
		]),
		importProvidersFrom(
			EffectsModule.forFeature([
				AuthEffects,
				ScriptEffects,
				FileEffects,
				ChartsEffects,
				ParametersEffects,
				TerminalEffects,
				StatisticsEffects,
				ModelsEffects
			])
		)
	];
}
