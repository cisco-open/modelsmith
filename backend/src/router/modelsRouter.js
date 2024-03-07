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

const hardcodedModels = ['resnet18'];

router.get('/model-files', (req, res) => {
	res.status(OK).send(hardcodedModels);
});

// Dynamic solution postponed. Will take more time to figure out a good solution.
// Will keep a hardcoded solution at this moment in time.

// router.get('/model-files', checkSshConnection, (req, res) => {
// 	const listCommand = `find ${process.env.MODELS_PATH} -type f -name "*.py" ! -name "__init__.py"`;

// 	conn.exec(listCommand, (err, stream) => {
// 		if (err) {
// 			console.error(`Error listing directory: ${err}`);
// 			return res.status(500).send({ message: 'Failed to list the directory.' });
// 		}

// 		let fileList = '';
// 		stream.on('data', (data) => {
// 			fileList += data.toString();
// 		});

// 		stream.on('close', (code) => {
// 			if (code !== 0) {
// 				console.error(`Error listing directory, exit code ${code}`);
// 				return res.status(500).send({ message: 'Failed to list the directory.' });
// 			}

// 			const filesArray = fileList.trim().split('\n');
// 			const filteredFiles = filesArray.map((file) => path.basename(file).replace('.py', ''));

// 			res.status(200).send(filteredFiles);
// 		});
// 	});
// });

module.exports = router;
