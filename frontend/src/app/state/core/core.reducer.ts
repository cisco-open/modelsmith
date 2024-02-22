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
