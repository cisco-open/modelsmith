//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

export enum WebsocketMessageTopics {
	SCRIPT_STATUS = 'script_status',
	STATISTICS = 'statistics',
	CHARTS_PREFIX = 'chart_'
}

export enum ChartWebsocketMessageTypes {
	UPDATE_TESTING = 'chart_updateTesting',
	UPDATE_LATEST_VALUE = 'chart_updateLatestValue',
	ENHANCE_SINGLE_PHASE_X_AXIS = 'chart_enhanceSinglePhaseXAxis'
}
