import { Pipe, PipeTransform } from '@angular/core';
import { isEmptyArray, isNil } from '../../../core/utils/core.utils';

@Pipe({
	name: 'reverseArray',
	standalone: true
})
export class ReverseArrayPipe implements PipeTransform {
	transform(value: any[] | null): any[] {
		if (isNil(value) || isEmptyArray(value)) return [];
		return value!.slice().reverse();
	}
}
