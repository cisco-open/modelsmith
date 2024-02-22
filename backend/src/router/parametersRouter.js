const express = require('express');
const router = express.Router();
const { OK, NOT_FOUND } = require('../constants/httpStatusCodes');
const ALGORITHM_PARAMETERS = require('../constants/parametersConstants');
const { getActiveScriptDetails } = require('../state/scriptState');

/**
 * GET /parameters/:key route handler.
 *
 * Retrieves the parameters for a specific algorithm based on the key.
 * If there is an active script running for the requested algorithm,
 * it overrides the default values of the parameters with the current
 * values from the active script. This ensures that the parameters
 * returned are reflective of the current state of the system,
 * providing up-to-date information for the frontend.
 *
 * @param {string} key - The key identifier for the algorithm. This is
 *                       extracted from the URL path parameter.
 *
 * Response:
 * - On success: Returns an object containing the parameters of the
 *               specified algorithm, with values overridden by the
 *               active script if applicable.
 * - On failure: Returns a NOT_FOUND error if the specified key
 *               is not found in the ALGORITHM_PARAMETERS.
 */
router.get('/parameters/:key', (req, res) => {
	const { key } = req.params;

	if (key in ALGORITHM_PARAMETERS) {
		let parameters = ALGORITHM_PARAMETERS[key];

		const activeScript = getActiveScriptDetails();
		if (activeScript && activeScript.algKey === key) {
			parameters = parameters.map((param) => {
				return {
					...param,
					defaultValue: activeScript.params[param.argName] ?? param.defaultValue
				};
			});
		}

		res.status(OK).send({ parameters });
	} else {
		res.status(NOT_FOUND).send({ error: 'Key not found in algorithm parameters' });
	}
});

module.exports = router;
