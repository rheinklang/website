export const compileStringTemplate = <T extends Record<string, any>>(
	literal: string | null | undefined,
	data: T,
	fallback = ''
): string => {
	if (!literal) {
		return '';
	}

	return literal.replace(/\{(.*?)\}/g, function (placeholder) {
		return data[placeholder.substring(1, placeholder.length - 1)] || fallback;
	});
};
