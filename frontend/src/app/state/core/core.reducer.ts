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

import { authReducer } from './auth';
import { chartsReducer } from './charts';
import { configsReducer } from './configs';
import { uploadFileReducer } from './file';
import { parameterReducer } from './parameters';
import { scriptReducer } from './script';
import { statisticsReducer } from './statistics';
import { terminalReducer } from './terminal';

export const coreReducers = {
	auth: authReducer,
	configs: configsReducer,
	script: scriptReducer,
	uploadFile: uploadFileReducer,
	charts: chartsReducer,
	parameters: parameterReducer,
	terminal: terminalReducer,
	statistics: statisticsReducer
};
