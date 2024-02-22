const express = require('express');
const router = express.Router();
const multer = require('multer');
const { conn } = require('../facades/executionFacade');
const { OK, INTERNAL_SERVER_ERROR } = require('../constants/httpStatusCodes');
const logger = require('../utils/logger');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-model', upload.single('file'), async (req, res) => {
	const uploadedFile = req.file;

	try {
		await uploadFileToVM(uploadedFile.buffer, `${process.env.MODELS_PATH}${uploadedFile.originalname}`);

		const updateInitCommand = `bash ${process.env.UPDATE_SCRIPT_PATH}`;

		conn().exec(updateInitCommand, (err, stream) => {
			if (err) {
				logger.error(`Error executing update_init.sh: ${err}`);
				return res
					.status(INTERNAL_SERVER_ERROR)
					.send({ message: 'Error executing the update_init script.', error: err.message });
			}

			stream.on('data', (data) => {
				logger.info(`update_init.sh output: ${data.toString()}`);
			});

			res.status(OK).send({ message: 'File uploaded successfully' });
		});
	} catch (err) {
		res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error uploading file to VM', error: err.message });
	}
});

function uploadFileToVM(fileBuffer, remotePath) {
	return new Promise((resolve, reject) => {
		conn().sftp((err, sftp) => {
			if (err) reject(err);

			const writeStream = sftp.createWriteStream(remotePath);

			writeStream.on('close', () => {
				sftp.end();
				resolve();
			});

			writeStream.on('error', (err) => {
				reject(err);
			});

			writeStream.write(fileBuffer, (err) => {
				if (err) reject(err);
				writeStream.end();
			});
		});
	});
}

module.exports = router;
