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

import { RoutesList } from '../enums/routes-list.enum';
import { Sidenav, SidenavItem } from '../interfaces/sidenav.interface';

const common: SidenavItem[] = [
	{
		route: 'admin',
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
		label: 'Model Compression',
		icon: 'icon-GearSix'
	},
	{
		route: RoutesList.MACHINE_UNLEARNING.ROOT,
		label: 'Machine Unlearning',
		icon: 'icon-Systems-Manager'
	},
	{
		route: 'model-specialization',
		label: 'Model Specialization',
		icon: 'icon-MapTrifold'
	},
	{
		route: 'multi-modal',
		label: 'Multi-modal',
		icon: 'icon-Environmental'
	},
	{
		route: RoutesList.MODEL_TRAINING.ROOT,
		label: 'Model Training',
		icon: 'icon-Inventory'
	}
];

export const SidenavConstants: Sidenav = {
	guided,
	expert,
	common
};
