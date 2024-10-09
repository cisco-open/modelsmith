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

const SSHConnection = require('./sshConnectionClass');
const { SSH_CONNECTION_NAMES, SSH_STATUS } = require('./sshConstants');

class SSHConnectionSingleton {
	static instance = null;

	static async init() {
		if (!SSHConnectionSingleton.instance) {
			SSHConnectionSingleton.instance = new SSHConnection(SSH_CONNECTION_NAMES.PRIMARY);
			if (SSHConnectionSingleton.instance.status !== SSH_STATUS.READY) {
				await new Promise((resolve, reject) => {
					SSHConnectionSingleton.instance.once('ready', () => {
						resolve();
					});

					SSHConnectionSingleton.instance.once('error', (err) => {
						reject(err);
					});
				});
			}
		}
	}

	static async getInstance() {
		if (!SSHConnectionSingleton.instance) {
			await this.init();
		}
		return SSHConnectionSingleton.instance;
	}

	static async getConnectionStatus() {
		if (!SSHConnectionSingleton.instance) {
			return SSH_STATUS.NOT_CONNECTED;
		}
		try {
			const sshConnection = await SSHConnectionSingleton.getInstance();
			return sshConnection.status;
		} catch (error) {
			return SSH_STATUS.ERROR;
		}
	}
}

module.exports = SSHConnectionSingleton;
