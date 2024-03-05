import { authReducer } from './auth';
import { chartsReducer } from './charts';
import { configsReducer } from './configs';
import { uploadFileReducer } from './file';
import { modelsReducer } from './models/models.reducer';
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
	statistics: statisticsReducer,
	models: modelsReducer
};
