import { AlgorithmKey } from '../../../../modules/model-compression/models/enums/algorithms.enum';
import { ChartTypeEnum } from '../../../../modules/shared/models/enums/chart-type.enum';

export interface ChartConfigurationSettings {
	alg?: AlgorithmKey;
	pruningTimes?: number;
	epochs?: number;
	epochSteps?: number;
	testingSteps?: number;
	yAxisMin?: number;
	yAxisMax?: number;
	yStepSize?: number;
}

export type ChartConfigurationSettingsDictionary = { [key in ChartTypeEnum]?: ChartConfigurationSettings };
