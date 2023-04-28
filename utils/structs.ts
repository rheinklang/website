export const keys = <T extends Record<string, any>>(obj: T): Array<keyof T> => Object.keys(obj) as Array<keyof T>;

export const getPaginationArray = <T>(entries: T[], entiresPerPage: number) => {
	if (entries.length <= entiresPerPage) {
		return [1];
	}

	const pages = Math.ceil(entries.length / entiresPerPage);
	const paginationArray: number[] = [];

	for (let i = 1; i <= pages; i++) {
		paginationArray.push(i);
	}

	return paginationArray;
};
