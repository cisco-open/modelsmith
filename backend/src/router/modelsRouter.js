//   Copyright 2024 Cisco Systems, Inc. and its affiliates

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

const express = require('express');
const router = express.Router();
const { OK } = require('../constants/httpStatusCodes');
const getModelsByType = require('../constants/modelsConstants');

router.get('/models-list/:type', (req, res) => {
	const type = req.params.type;
	const models = getModelsByType(type);

	if (models.length === 0) {
		return res.status(404).send('Model type not found');
	}

	res.status(OK).send(models);
});

module.exports = router;
