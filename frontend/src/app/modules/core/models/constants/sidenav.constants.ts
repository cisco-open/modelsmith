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
		route: 'machine-unlearning',
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
	}
];

export const SidenavConstants: Sidenav = {
	guided,
	expert,
	common
};
