import { AnimationType } from '../enums/animation-type.enum';
import { AnimationConfig } from '../interfaces/animation-config.interface';

export const ANIMATION_CONFIGS: Record<AnimationType, AnimationConfig> = {
	[AnimationType.PRUNING]: {
		path: '../assets/animations/pruning.lottie',
		speed: 0.15,
		className: 'pruning'
	},
	[AnimationType.QUANTIZATION]: {
		path: '../assets/animations/quantization.lottie',
		speed: 0.08,
		className: 'quant'
	}
};
