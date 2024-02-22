import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
	MachineUnlearningProgress,
	PruningProgress,
	QuantizationProgress
} from '../../../services/client/models/charts/chart-data.interface-dto';
import { ChartConfigurationSettingsDictionary } from '../../../services/client/models/charts/chart-settings.interface-dto';
import {
	ChartsState,
	selectMachineUnlearningProgress,
	selectPruningProgress,
	selectQuantizationProgress,
	selectSettings
} from '../../../state/core/charts';

@Injectable()
export class ChartsFacadeService {
	pruningProgress: Observable<PruningProgress[] | undefined>;
	quantizationProgress$: Observable<QuantizationProgress | undefined>;
	machineUnlearningProgress$: Observable<MachineUnlearningProgress | undefined>;
	settings$: Observable<ChartConfigurationSettingsDictionary | undefined>;

	constructor(private store: Store<ChartsState>) {
		this.pruningProgress = this.store.select(selectPruningProgress);
		this.quantizationProgress$ = this.store.select(selectQuantizationProgress);
		this.machineUnlearningProgress$ = this.store.select(selectMachineUnlearningProgress);
		this.settings$ = this.store.select(selectSettings);
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
