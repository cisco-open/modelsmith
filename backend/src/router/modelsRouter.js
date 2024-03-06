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
