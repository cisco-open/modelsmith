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
const app = express();
const path = require('path');

// Serve static files from the 'modelsmith-build' directory
app.use(express.static(path.join(__dirname, 'modelsmith-build')));

// Serve JavaScript files with the correct content type
app.get('*.js', (_, res, next) => {
	res.setHeader('content-type', 'application/javascript');
	next();
});

// Redirect all routes to index.html to handle Angular routing
app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, 'modelsmith-build/index.html'));
});

const port = 4200;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
