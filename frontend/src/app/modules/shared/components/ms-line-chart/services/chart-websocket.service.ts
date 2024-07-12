import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChartWebsocketMessageTypes } from '../../../../core/models/enums/websocket-message-types.enum';
import { ChartsMessages } from '../../../../core/models/interfaces/charts-messages.interface';
import { WebsocketService } from '../../../../core/services';
import { isNilOrEmptyString } from '../../../shared.utils';
import { RealtimeUpdateMetricEnum } from '../models/enums/realtime-update-metric.enum';
import { ChartsRealtimeUpdateValues } from '../models/interfaces/ms-charts-realtime-update-values.interface';

@Injectable()
export class ChartWebsocketService {
	private websocketSubscription?: Subscription;

	public latestValuesToUpdate = new Subject<{ datasetIndex: number; value: number }>();
	public enhanceXAxis = new Subject<number>();

	constructor(private websocketService: WebsocketService) {}

	initializeWebSocket(realtimeUpdateMetric?: RealtimeUpdateMetricEnum) {
		if (isNilOrEmptyString(realtimeUpdateMetric)) {
			return;
		}

		if (this.websocketSubscription) {
			this.websocketSubscription.unsubscribe();
		}

		this.websocketSubscription = this.websocketService.chartsMessages$.subscribe((message: ChartsMessages) => {
			this.handleWebsocketMessage(message, realtimeUpdateMetric!);
		});
	}

	private handleWebsocketMessage(message: ChartsMessages, realtimeUpdateMetric: RealtimeUpdateMetricEnum): void {
		switch (message.topic) {
			case ChartWebsocketMessageTypes.UPDATE_LATEST_VALUE: {
				const { accuracy, loss, sparsity, datasetIndex } = message.data as ChartsRealtimeUpdateValues;
				if (accuracy !== undefined && realtimeUpdateMetric === RealtimeUpdateMetricEnum.ACCURACY) {
					this.latestValuesToUpdate.next({ datasetIndex, value: accuracy });
				} else if (loss !== undefined && realtimeUpdateMetric === RealtimeUpdateMetricEnum.LOSS) {
					this.latestValuesToUpdate.next({ datasetIndex, value: loss });
				} else if (sparsity !== undefined && realtimeUpdateMetric === RealtimeUpdateMetricEnum.SPARSITY) {
					this.latestValuesToUpdate.next({ datasetIndex: 0, value: sparsity });
				}
				break;
			}
			case ChartWebsocketMessageTypes.UPDATE_TESTING:
				const { accuracy, loss, datasetIndex } = message.data as ChartsRealtimeUpdateValues;
				if (accuracy !== undefined && realtimeUpdateMetric === RealtimeUpdateMetricEnum.TESTING_ACCURACY) {
					this.latestValuesToUpdate.next({ datasetIndex, value: accuracy });
				} else if (loss !== undefined && realtimeUpdateMetric === RealtimeUpdateMetricEnum.TESTING_LOSS) {
					this.latestValuesToUpdate.next({ datasetIndex, value: loss });
				}
				break;
			case ChartWebsocketMessageTypes.ENHANCE_SINGLE_PHASE_X_AXIS:
				const { reconstructionIndex } = message.data as { reconstructionIndex: number };
				this.enhanceXAxis.next(reconstructionIndex);
				break;
			default:
				break;
		}
	}

	ngOnDestroy(): void {
		if (this.websocketSubscription) {
			this.websocketSubscription.unsubscribe();
		}
	}
}
