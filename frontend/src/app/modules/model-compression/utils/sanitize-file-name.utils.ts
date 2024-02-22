export function sanitizeFilename(filename: string): string {
	let sanitized = filename.replace(/[^a-zA-Z0-9_]/g, '_');

	if (/^[0-9_]/.test(sanitized)) {
		sanitized = 'file_' + sanitized;
	}

	if (!/.py$/.test(sanitized)) {
		sanitized += '.py';
	}

	return sanitized;
}
