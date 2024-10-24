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
		icon: 'icon-Admin'
	}
];

const guided: SidenavItem[] = [
	{
		route: RoutesList.WIZARD.ROOT,
		label: 'Wizard',
		icon: 'icon-Question'
	}
];

const expert: SidenavItem[] = [
	{
		route: RoutesList.MODEL_COMPRESSION.ROOT,
		label: 'Clasic Model Compression',
		icon: 'icon-GearSix',
		key: PageKey.MODEL_COMPRESSION
	},
	{
		route: RoutesList.MACHINE_UNLEARNING.ROOT,
		label: 'Machine Unlearning',
		icon: 'icon-Systems-Manager',
		key: PageKey.MACHINE_UNLEARNING
	},
	{
		route: RoutesList.AWQ.ROOT,
		label: 'LLM Quantization',
		icon: 'icon-Lightning',
		key: PageKey.AWQ
	},
	{
		route: RoutesList.MULTI_MODAL.ROOT,
		label: 'Multi-modal',
		icon: 'icon-Environmental',
		key: PageKey.MODEL_SPECIALIZATION
	},
	{
		route: RoutesList.ALGORITHM_COMPARISON.ROOT,
		label: 'Algorithm Comparison',
		icon: 'icon-Rocket'
	}
];

export const SidenavConstants: Sidenav = {
	guided,
	expert,
	common
};
