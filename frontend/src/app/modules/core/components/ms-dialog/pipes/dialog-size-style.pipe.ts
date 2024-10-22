import { Pipe, PipeTransform } from '@angular/core';
import { getDialogSizeStyles } from '../dialog.utils';
import { DialogCSSSize } from '../models/types/dialog-css-size.type';

@Pipe({
	name: 'dialogSizeStyles',
	standalone: true,
	pure: true
})
export class DialogSizeStylesPipe implements PipeTransform {
	transform(width?: DialogCSSSize, height?: DialogCSSSize): { [klass: string]: any } {
		return getDialogSizeStyles(width, height);
	}
}
