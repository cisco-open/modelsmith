export const generateRandomID = (): number => {
	return Math.floor(Math.random() * 1000000);
};

export function isEmptyObject(obj: any): boolean {
	return (
		obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0 && obj.constructor === Object
	);
}
