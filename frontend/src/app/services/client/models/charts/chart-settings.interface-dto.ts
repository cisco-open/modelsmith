//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

import { AlgorithmKey } from '../../../../modules/model-compression/models/enums/algorithms.enum';
import { ChartTypeEnum } from '../../../../modules/shared/components/ms-line-chart/models/enums/chart-type.enum';

export interface ChartConfigurationSettings {
	alg?: AlgorithmKey;
	pruningTimes?: number;
	epochs?: number;
	epochSteps?: number;
	testingSteps?: number;
	yAxisMin?: number;
	yAxisMax?: number;
	yStepSize?: number;
	reconstructions?: number;
}

export type ChartConfigurationSettingsDictionary = { [key in ChartTypeEnum]?: ChartConfigurationSettings };
