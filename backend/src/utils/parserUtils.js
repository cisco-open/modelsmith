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

const { pruningParserInstance } = require('../parsers/pruningParser');
const { quantizationParserInstance } = require('../parsers/quantizationParser');
const { machineUnlearningParserInstance } = require('../parsers/machineUnlearningParser');
const ALGORITHM_TYPES = require('../constants/algorithmTypesConstants');

/**
 * Returns the parser instance for the given algorithm type.
 * @param {string} algorithmType - The type of algorithm for which the parser is required.
 * @returns {Object|null} - The parser instance corresponding to the given algorithm type or null if not recognized.
 */
function getParserForAlgorithmType(algorithmType) {
	switch (algorithmType) {
		case ALGORITHM_TYPES.PRUNING:
			return pruningParserInstance;
		case ALGORITHM_TYPES.QUANTIZATION:
			return quantizationParserInstance;
		case ALGORITHM_TYPES.MACHINE_UNLEARNING:
			return machineUnlearningParserInstance;
		default:
			return null;
	}
}

module.exports = { getParserForAlgorithmType };
