import { Pipe, PipeTransform } from '@angular/core';
import { getDialogSizeStyles } from '../dialog.utils';
import { CSSSize } from '../models/types/css-size.type';

@Pipe({
	name: 'dialogSizeStyles',
	standalone: true,
	pure: true
})
export class DialogSizeStylesPipe implements PipeTransform {
	transform(width?: CSSSize, height?: CSSSize): { [klass: string]: any } {
		return getDialogSizeStyles(width, height);
	}
}
