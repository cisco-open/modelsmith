import { Pipe, PipeTransform } from '@angular/core';
import { getDrawerSizeStyles } from '../drawer.utils';
import { DrawerCSSSize } from '../models/types/drawer-css-size.type';

@Pipe({
	name: 'drawerSizeStyles',
	standalone: true,
	pure: true
})
export class DrawerSizeStylesPipe implements PipeTransform {
	transform(width?: DrawerCSSSize): { [klass: string]: any } {
		return getDrawerSizeStyles(width);
	}
}
