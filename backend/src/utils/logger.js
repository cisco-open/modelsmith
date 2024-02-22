const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	let formattedMessage = message;

	if (typeof message === 'object') {
		if (message instanceof Error) {
			formattedMessage = `Error: ${message.message}\nStack: ${message.stack}`;
		} else {
			formattedMessage = JSON.stringify(message, null, 2);
		}
	}

	return `${timestamp} [${level}]: ${formattedMessage}`;
});

const logger = createLogger({
	format: combine(
		colorize({ all: false }),
		timestamp({
			format: 'DD-MM-YYYY HH:mm:ss'
		}),
		myFormat
	),
	transports: [new transports.Console()]
});

module.exports = logger;
