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
