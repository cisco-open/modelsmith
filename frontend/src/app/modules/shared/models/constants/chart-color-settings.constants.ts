import { ChartColorEnum } from '../enums/chart-color.enum';
import { DatasetColors } from '../interfaces/ms-dataset-colors.interface';

export const chartColorsSettings: Record<ChartColorEnum, DatasetColors> = {
	[ChartColorEnum.GREEN]: {
		datasetColors: [
			{ borderColor: '#40dab7', backgroundColor: 'rgba(64, 218, 183, 0.2)' },
			{ borderColor: '#3ac4a5', backgroundColor: 'rgba(58, 196, 165, 0.2)' },
			{ borderColor: '#33ae92', backgroundColor: 'rgba(51, 174, 146, 0.2)' },
			{ borderColor: '#2d9980', backgroundColor: 'rgba(45, 153, 128, 0.2)' },
			{ borderColor: '#26836e', backgroundColor: 'rgba(38, 131, 110, 0.2)' },
			{ borderColor: '#206d5c', backgroundColor: 'rgba(32, 109, 92, 0.2)' },
			{ borderColor: '#1a5749', backgroundColor: 'rgba(26, 87, 73, 0.2)' },
			{ borderColor: '#134137', backgroundColor: 'rgba(19, 65, 55, 0.2)' },
			{ borderColor: '#0d2c25', backgroundColor: 'rgba(13, 44, 37, 0.2)' },
			{ borderColor: '#061612', backgroundColor: 'rgba(6, 22, 18, 0.2)' }
		]
	},
	[ChartColorEnum.BLUE]: {
		datasetColors: [
			{ borderColor: '#29aadc', backgroundColor: 'rgba(41, 170, 220, 0.2)' },
			{ borderColor: '#2599c6', backgroundColor: 'rgba(37, 153, 198, 0.2)' },
			{ borderColor: '#2188b0', backgroundColor: 'rgba(33, 136, 176, 0.2)' },
			{ borderColor: '#1d779a', backgroundColor: 'rgba(29, 119, 154, 0.2)' },
			{ borderColor: '#196684', backgroundColor: 'rgba(25, 102, 132, 0.2)' },
			{ borderColor: '#15556e', backgroundColor: 'rgba(21, 85, 110, 0.2)' },
			{ borderColor: '#104458', backgroundColor: 'rgba(16, 68, 88, 0.2)' },
			{ borderColor: '#0c3342', backgroundColor: 'rgba(12, 51, 66, 0.2)' },
			{ borderColor: '#08222c', backgroundColor: 'rgba(8, 34, 44, 0.2)' },
			{ borderColor: '#041116', backgroundColor: 'rgba(4, 17, 22, 0.2)' }
		]
	},
	[ChartColorEnum.RED]: {
		datasetColors: [
			{ borderColor: '#b02863', backgroundColor: 'rgba(176, 40, 99, 0.2)' },
			{ borderColor: '#9e2459', backgroundColor: 'rgba(158, 36, 89, 0.2)' },
			{ borderColor: '#8d204f', backgroundColor: 'rgba(141, 32, 79, 0.2)' },
			{ borderColor: '#7b1c45', backgroundColor: 'rgba(123, 28, 69, 0.2)' },
			{ borderColor: '#6a183b', backgroundColor: 'rgba(106, 24, 59, 0.2)' },
			{ borderColor: '#581432', backgroundColor: 'rgba(88, 20, 50, 0.2)' },
			{ borderColor: '#461028', backgroundColor: 'rgba(70, 16, 40, 0.2)' },
			{ borderColor: '#350c1e', backgroundColor: 'rgba(53, 12, 30, 0.2)' },
			{ borderColor: '#230814', backgroundColor: 'rgba(35, 8, 20, 0.2)' },
			{ borderColor: '#12040a', backgroundColor: 'rgba(18, 4, 10, 0.2)' }
		]
	},
	[ChartColorEnum.YELLOW]: {
		datasetColors: [
			{ borderColor: '#f1c40f', backgroundColor: 'rgba(241, 196, 15, 0.2)' },
			{ borderColor: '#d9b00e', backgroundColor: 'rgba(217, 176, 14, 0.2)' },
			{ borderColor: '#c19d0c', backgroundColor: 'rgba(193, 157, 12, 0.2)' },
			{ borderColor: '#a9890b', backgroundColor: 'rgba(169, 137, 11, 0.2)' },
			{ borderColor: '#917609', backgroundColor: 'rgba(145, 118, 9, 0.2)' },
			{ borderColor: '#796208', backgroundColor: 'rgba(121, 98, 8, 0.2)' },
			{ borderColor: '#604e06', backgroundColor: 'rgba(96, 78, 6, 0.2)' },
			{ borderColor: '#483b04', backgroundColor: 'rgba(72, 59, 4, 0.2)' },
			{ borderColor: '#302703', backgroundColor: 'rgba(48, 39, 3, 0.2)' },
			{ borderColor: '#181401', backgroundColor: 'rgba(24, 20, 1, 0.2)' }
		]
	}
};
