import { createSelector } from '@ngrx/store';
import { AlgorithmType } from '../../../modules/model-compression/models/enums/algorithms.enum';
import { selectCoreState } from '../core.selector';

export const selectModelsByType = (algorithmType: AlgorithmType) =>
	createSelector(selectCoreState, (state) => {
		switch (algorithmType) {
			case AlgorithmType.QUANTIZATION:
				return state.models.quantizationModels;
			case AlgorithmType.PRUNING:
				return state.models.pruningModels;
			case AlgorithmType.MACHINE_UNLEARNING:
				return state.models.machineUnlearningModels;
			default:
				return undefined;
		}
	});
