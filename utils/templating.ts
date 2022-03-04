export const compileStringTemplate = <T extends Record<string, any>>(
	literal: string,
	data: T,
	fallback = ''
): string => {
	return literal.replace(/\$(.*?)\$/g, function (placeholder) {
		return data[placeholder.substring(1, placeholder.length - 1)] || fallback;
	});
};
