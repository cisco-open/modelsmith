export enum WebsocketMessageTopics {
	TERMINAL = 'terminal',
	SCRIPT_STATUS = 'script_status',
	STATISTICS = 'statistics',
	CHARTS_PREFIX = 'chart_'
}

export enum ChartWebsocketMessageTypes {
	UPDATE_TESTING = 'chart_updateTesting',
	UPDATE_LATEST_VALUE = 'chart_updateLatestValue'
}
