export const keys = <T>(obj: T): Array<keyof T> => Object.keys(obj) as Array<keyof T>;

export const getPaginationArray = <T>(entries: T[], entiresPerPage: number) => {
	if (entries.length <= entiresPerPage) {
		return [1];
	}

	const pages = Math.ceil(entries.length / entiresPerPage);
	return new Array(pages, null).map((_, index) => index + 1);
};
