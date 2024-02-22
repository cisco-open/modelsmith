const fs = require('fs');
const { SSH_CONNECTION_NAMES } = require('../constants/sshConstants');

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
		const privateKeyPath = process.env[`${prefix}_SSH_PRIVATE_KEY_PATH`];

		if (password) {
			config.password = password;
		}

		if (privateKeyPath) {
			try {
				config.privateKey = fs.readFileSync(privateKeyPath);
			} catch (error) {
				console.error(`Failed to read private key from ${privateKeyPath}:`, error.message);
				throw new Error(`Failed to read private key for ${connectionName}: ${error.message}`);
			}
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
