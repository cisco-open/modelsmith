const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');

// Enable compression middleware
app.use(compression());

// Serve static files from the 'modelsmith-build/browser' directory
app.use(express.static(path.join(__dirname, 'modelsmith-build', 'browser')));

// Serve JavaScript files with the correct content type
app.get('*.js', (_, res, next) => {
	res.setHeader('content-type', 'application/javascript');
	next();
});

// Redirect all routes to index.html to handle Angular routing
app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, 'modelsmith-build', 'browser', 'index.html'));
});

const port = 4200;
const server = app.listen(port, () => {
	console.log(`Frontend server is running on port ${port}`);
});

var signals = {
	SIGHUP: 1,
	SIGINT: 2,
	SIGTERM: 15
};

const shutdown = (signal, value) => {
	console.log('Shutdown!');
	server.close(() => {
		console.log(`Server stopped by ${signal} with value ${value}.`);
		process.exit(128 + value);
	});
};

Object.keys(signals).forEach((signal) => {
	process.on(signal, () => {
		console.log(`Process received a ${signal} signal.`);
		shutdown(signal, signals[signal]);
	});
});
