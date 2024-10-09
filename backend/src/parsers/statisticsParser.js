//   Copyright 2024 Cisco Systems, Inc.

//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at

//       http://www.apache.org/licenses/LICENSE-2.0

//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

//  SPDX-License-Identifier: Apache-2.0

const { broadcastChart, MessageTopics } = require('../websockets/websocketService');

class StatisticsParser {
	static statisticsRegex = /Statistics:\s+(\S+):\s+(\d+\.\d+|\d+)/;

	constructor() {
		this.statistics = {};
	}

	processStatistics(line) {
		const match = line.match(StatisticsParser.statisticsRegex);
		if (match) {
			const key = match[1];
			const value = parseFloat(match[2]);
			this.statistics[key] = value;

			broadcastChart(`${MessageTopics.STATISTICS}`, {
				statistics: this.getStatistics()
			});
		}
	}

	getStatistics() {
		return this.statistics;
	}

	resetStatistics() {
		this.statistics = {};
	}
}

const statisticsParserInstance = new StatisticsParser();

module.exports = statisticsParserInstance;
