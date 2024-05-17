import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'emptyTableField',
	standalone: true
})
export class EmptyTableFieldPipe implements PipeTransform {
	transform(value: string | number | null): string {
		if ((typeof value === 'string' && !!value && value != 'None') || (typeof value === 'number' && !isNaN(value))) {
			return value.toString();
		}
		return '-';
	}
}
