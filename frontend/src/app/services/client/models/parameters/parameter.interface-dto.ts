export interface ParametersDto {
	argName: string;
	defaultValue: number | string;
	inputType: 'text' | 'number' | 'select' | 'checkbox';
	label: string;
	placeholder: string;
	help: string;
	validators: ValidatorsConfig;
	options?: Array<{ value: string; viewValue: string }>;
}

export interface ActiveParameters {
	[key: string]: string;
}

export interface ValidatorsConfig {
	required?: boolean;
	min?: number;
	max?: number;
}
