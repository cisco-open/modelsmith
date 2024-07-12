import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { coreReducers } from './core';
import { AuthEffects } from './core/auth';
import { ChartsEffects } from './core/charts';
import { FileEffects } from './core/file';
import { ModelsEffects } from './core/models/models.effects';
import { ParametersEffects } from './core/parameters';
import { ScriptEffects } from './core/script';
import { StatisticsEffects } from './core/statistics';
import { TerminalEffects } from './core/terminal';

export function provideGlobalState(): EnvironmentProviders[] {
	return [
		importProvidersFrom(StoreModule.forFeature('core', coreReducers)),
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
