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

import { PageKey } from '../../../../../core/models/enums/page-key.enum';
import { RoutesList } from '../../../../../core/models/enums/routes-list.enum';
import { Sidenav, SidenavItem } from '../interfaces/sidenav.interface';

const common: SidenavItem[] = [
	{
		route: RoutesList.ADMIN.ROOT,
		label: 'Admin',
		icon: 'icon-Admin',
		fontSet: 'ms'
	}
];

const guided: SidenavItem[] = [
	{
		route: RoutesList.WIZARD.ROOT,
		label: 'Wizard',
		icon: 'icon-Question',
		fontSet: 'ms'
	}
];

const expert: SidenavItem[] = [
	{
		route: RoutesList.MODEL_COMPRESSION.ROOT,
		label: 'Model Compression',
		icon: 'icon-GearSix',
		fontSet: 'ms',
		key: PageKey.MODEL_COMPRESSION
	},
	{
		route: RoutesList.MACHINE_UNLEARNING.ROOT,
		label: 'Machine Unlearning',
		icon: 'icon-Systems-Manager',
		fontSet: 'ms',
		key: PageKey.MACHINE_UNLEARNING
	},
	{
		route: RoutesList.AWQ.ROOT,
		label: 'LLM Quantization',
		icon: 'icon-Lightning',
		fontSet: 'ms',
		key: PageKey.AWQ
	},
	{
		route: RoutesList.MULTI_MODAL.ROOT,
		label: 'Multi-modal',
		icon: 'icon-Environmental',
		fontSet: 'ms',
		key: PageKey.MODEL_SPECIALIZATION
	},
	{
		route: RoutesList.DIFFUSION_MODEL.ROOT,
		label: 'Diffusion Model',
		icon: 'machine-learning',
		fontSet: 'svg',
		key: PageKey.DIFFUSION_MODEL
	},
	{
		route: RoutesList.ALGORITHM_COMPARISON.ROOT,
		label: 'Algorithm Comparison',
		icon: 'icon-Rocket',
		fontSet: 'ms'
	}
];

export const SidenavConstants: Sidenav = {
	guided,
	expert,
	common
};
