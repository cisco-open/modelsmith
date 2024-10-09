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

const fs = require('fs');
const path = require('path');
const os = require('os');
const { SSH_CONNECTION_NAMES } = require('./sshConstants');

class SSHConfigManager {
	static getConfig(connectionName) {
		switch (connectionName) {
			case SSH_CONNECTION_NAMES.PRIMARY:
			case SSH_CONNECTION_NAMES.BACKUP:
				return this.createConfig(connectionName);
			default:
				throw new Error(`Unknown connection name: ${connectionName}`);
		}
	}

	static createConfig(connectionName) {
		const prefix = connectionName === SSH_CONNECTION_NAMES.PRIMARY ? 'PRIMARY' : 'BACKUP';
		const config = {
			host: process.env[`${prefix}_SSH_HOST`],
			port: parseInt(process.env[`${prefix}_SSH_PORT`], 10),
			username: process.env[`${prefix}_SSH_USERNAME`]
		};

		const password = process.env[`${prefix}_SSH_PASSWORD`];
		let privateKeyPath = process.env[`${prefix}_SSH_PRIVATE_KEY_PATH`];

		if (password) {
			config.password = password;
		}

		if (privateKeyPath) {
			if (privateKeyPath.startsWith('~')) {
				privateKeyPath = path.join(os.homedir(), privateKeyPath.slice(1));
			}

			try {
				config.privateKey = fs.readFileSync(privateKeyPath);
			} catch (error) {
				console.error(`Failed to read private key from ${privateKeyPath}:`, error.message);
				throw new Error(`Failed to read private key for ${connectionName}: ${error.message}`);
			}
		}

		const proxyHost = process.env[`${prefix}_PROXY_SSH_HOST`];
		const proxyPort = parseInt(process.env[`${prefix}_PROXY_SSH_PORT`], 10) || 22;
		const proxyUser = process.env[`${prefix}_PROXY_SSH_USER`];
		let proxyKeyPath = process.env[`${prefix}_PROXY_SSH_PRIVATE_KEY_PATH`];

		if (proxyKeyPath && proxyKeyPath.startsWith('~')) {
			proxyKeyPath = path.join(os.homedir(), proxyKeyPath.slice(1));
		}

		if (proxyHost && proxyUser && proxyKeyPath) {
			config.proxy = {
				host: proxyHost,
				port: proxyPort,
				username: proxyUser,
				privateKey: fs.readFileSync(proxyKeyPath)
			};
		}

		if (!config.password && !config.privateKey) {
			throw new Error(
				`${connectionName} connection requires either a password or a private key for SSH authentication.`
			);
		}

		return config;
	}
}

module.exports = SSHConfigManager;
