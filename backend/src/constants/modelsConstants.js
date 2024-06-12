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

const PRUNING_MODELS = [
	'ResNet18',
	'ResNet34',
	'ResNet50',
	'ResNet101',
	'ResNet152',
	'VGG11',
	'VGG13',
	'VGG16',
	'VGG19'
];

const MACHINE_UNLEARNING_MODELS = [
	'ResNet18',
	'ResNet34',
	'ResNet50',
	'ResNet101',
	'ResNet152',
	'VGG11',
	'VGG13',
	'VGG16',
	'VGG19'
];

const AWQ_MODELS = [
	'mistralai/Mistral-7B-Instruct-v0.2',
	'mistralai/Mistral-7B-v0.3',
	'mosaicml/mpt-7b',
	'decapoda-research/llama-7b-hf',
	'facebook/opt-1.3b',
	'tiiuae/falcon-7b',
	'bigscience/bloom-560m',
	'EleutherAI/gpt-j-6B',
	'bigcode/gpt_bigcode-santacoder',
	'EleutherAI/gpt-neox-20b',
	'Qwen/Qwen-7B',
	'baichuan-inc/Baichuan-7B',
	'liuhaotian/LLaVA-13b',
	'stabilityai/stablelm-tuned-alpha-7b',
	'bigcode/starcoder'
];

function getModelsByType(type) {
	switch (type) {
		case ALGORITHM_TYPES.QUANTIZATION:
			return QUANTIZATION_MODELS;
		case ALGORITHM_TYPES.PRUNING:
			return PRUNING_MODELS;
		case ALGORITHM_TYPES.MACHINE_UNLEARNING:
			return MACHINE_UNLEARNING_MODELS;
		case ALGORITHM_TYPES.AWQ:
			return AWQ_MODELS;
		default:
			return [];
	}
}

module.exports = getModelsByType;
