import { createReducer, on } from '@ngrx/store';
import { KeyValue } from '../../../services/client/models/key-value/key-value.interface-dto';
import { StatisticsActions } from './statistics.actions';
import { StatisticsState } from './statistics.state';

export const initialState: StatisticsState = {
	statistics: {} as KeyValue<string>,
	error: null
};

export const statisticsReducer = createReducer(
	initialState,
	on(StatisticsActions.getStatisticsSuccess, (state, { statistics }) => {
		return {
			...state,
			statistics,
			error: null
		};
	}),
	on(StatisticsActions.getStatisticsFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(StatisticsActions.updateStatistics, (state, { statistics }) => ({
		...state,
		statistics,
		error: null
	}))
);
