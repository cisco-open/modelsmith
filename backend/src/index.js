require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const noCache = require('./middlewares/noCache');
const websocketService = require('./services/websocketService');
const allRoutes = require('./router/allRoutes');
const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());
app.use(noCache);

app.use('/rest', allRoutes);

const server = app.listen(process.env.PORT, () => {
	logger.info(`Server is running on port ${process.env.PORT}`);
});

server.on('upgrade', (request, socket, head) => {
	websocketService.wss.handleUpgrade(request, socket, head, (ws) => {
		websocketService.wss.emit('connection', ws, request);
	});
});
