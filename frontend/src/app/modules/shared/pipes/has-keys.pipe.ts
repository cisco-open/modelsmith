import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'hasKeys',
	standalone: true
})
export class HasKeysPipe implements PipeTransform {
	transform(value: any): boolean {
		return value && typeof value === 'object' && Object.keys(value).length > 0;
	}
}
