//   Copyright 2024 Cisco Systems, Inc.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   SPDX-License-Identifier: Apache-2.0

export const PageKey = {
	MODEL_COMPRESSION: 'MODEL_COMPRESSION',
	MACHINE_UNLEARNING: 'MACHINE_UNLEARNING',
	MODEL_TRAINING: 'MODEL_TRAINING',
	AWQ: 'AWQ',
	MODEL_SPECIALIZATION: 'MODEL_SPECIALIZATION',
	DIFFUSION_MODEL: 'DIFFUSION_MODEL',
	NONE: 'NONE'
} as const;

export type PageKey = (typeof PageKey)[keyof typeof PageKey];
