export interface SidenavItem {
	route: string;
	label: string;
	icon: string;
}

export interface Sidenav {
	guided?: SidenavItem[];
	expert?: SidenavItem[];
	common?: SidenavItem[];
}
