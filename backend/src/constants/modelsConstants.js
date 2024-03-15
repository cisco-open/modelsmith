const ALGORITHM_TYPES = require('./algorithmTypesConstants');

const QUANTIZATION_MODELS = [
	'resnet18',
	'resnet34',
	'resnet50',
	'resnet101',
	'resnet152',
	'resnext50_32x4d',
	'resnext101_32x8d',
	'wide_resnet50_2',
	'wide_resnet101_2'
];

const PRUNING_MODELS = [];

const MACHINE_UNLEARNING_MODELS = [];

function getModelsByType(type) {
	switch (type) {
		case ALGORITHM_TYPES.QUANTIZATION:
			return QUANTIZATION_MODELS;
		case ALGORITHM_TYPES.PRUNING:
			return PRUNING_MODELS;
		case ALGORITHM_TYPES.MACHINE_UNLEARNING:
			return MACHINE_UNLEARNING_MODELS;
		default:
			return [];
	}
}

module.exports = getModelsByType;
