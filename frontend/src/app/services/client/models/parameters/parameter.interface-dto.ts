//    Copyright 2024 Cisco Systems, Inc. and its affiliates

//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

//   SPDX-License-Identifier: Apache-2.0

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
