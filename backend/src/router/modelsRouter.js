const express = require('express');
const router = express.Router();
const { OK } = require('../constants/httpStatusCodes');

const hardcodedModels = [
	'DenseNet121',
	'DenseNet169',
	'DenseNet201',
	'DenseNet161',
	'densenet_cifar',
	'SimpleDLA',
	'DLA',
	'DPN26',
	'DPN92',
	'EfficientNetB0',
	'GoogLeNet',
	'LeNet',
	'MobileNet',
	'mobilenetv2',
	'PNASNetA',
	'PNASNetB',
	'PreActResNet18',
	'PreActResNet34',
	'PreActResNet50',
	'PreActResNet101',
	'PreActResNet152',
	'RegNetX_200MF',
	'RegNetX_400MF',
	'RegNetY_400MF',
	'resnet18',
	'resnet34',
	'resnet50',
	'resnet101',
	'resnet152',
	'resnext50_32x4d',
	'ResNeXt29_2x64d',
	'ResNeXt29_4x64d',
	'ResNeXt29_8x64d',
	'ResNeXt29_32x4d',
	'resnext101_32x8d',
	'wide_resnet50_2',
	'wide_resnet101_2',
	'SENet18',
	'ShuffleNetG2',
	'ShuffleNetG3',
	'ShuffleNetV2',
	'VGG'
];

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
