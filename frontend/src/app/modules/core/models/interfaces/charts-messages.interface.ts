import { ChartWebsocketMessageTypes } from '../enums/websocket-message-types.enum';

export interface ChartsMessages {
	topic: ChartWebsocketMessageTypes;
	data: Object;
}
