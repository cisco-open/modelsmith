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
