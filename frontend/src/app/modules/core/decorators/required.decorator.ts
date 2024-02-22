export function Required(target: any, propertyKey: string): void {
	const ngOnInit = target.ngOnInit;

	target.ngOnInit = function () {
		if (this[propertyKey] === undefined || this[propertyKey] === null) {
			throw new Error(`Required input '${propertyKey}' was not provided in ${target.constructor.name}.`);
		}
		if (ngOnInit) return ngOnInit.apply(this);
	};
}
