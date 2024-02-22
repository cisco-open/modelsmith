import {
	MachineUnlearningProgress,
	PruningProgress,
	QuantizationProgress
} from '../../../services/client/models/charts/chart-data.interface-dto';
import { ChartConfigurationSettingsDictionary } from '../../../services/client/models/charts/chart-settings.interface-dto';

export interface ChartsState {
	pruningProgress: PruningProgress[] | undefined;
	machineUnlearningProgress: MachineUnlearningProgress | undefined;
	quantizationProgress: QuantizationProgress | undefined;
	settings: ChartConfigurationSettingsDictionary;
	error: any | null;
}
