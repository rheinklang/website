interface LocalStorageAPI {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
	clear(): void;
}

export enum LocalStorageKeys {
	COLOR_SCHEME = 'application-color-scheme',
	SWR_CACHE = 'application-swr-cache',
	BUILD_ID = 'application-build-identifier',
	TIMETSTAMP = 'storage-update-timestamp',
}

export class LocalStorage {
	private container: LocalStorageAPI;
	private fallback = new Map();

	private static AVAILABLITY_KEY = '__availability__';

	constructor() {
		try {
			localStorage.setItem(LocalStorage.AVAILABLITY_KEY, 'success');
			localStorage.removeItem(LocalStorage.AVAILABLITY_KEY);

			this.container = localStorage;
		} catch {
			this.container = {
				getItem: (key: string) => {
					return this.fallback.get(key) || null;
				},
				setItem: (key: string, value: string) => {
					this.fallback.set(key, value);
				},
				removeItem: (key: string) => {
					this.fallback.delete(key);
				},
				clear: () => {
					this.fallback.clear();
				},
			};
		}
	}

	public get<T>(key: string, fallbackValue?: T): T | null {
		const value = this.container.getItem(key);

		if (value === null) {
			return fallbackValue || null;
		}

		return this.deserialize(value) as T;
	}

	public set<T>(key: string, value: T) {
		this.container.setItem(key, this.serialize(value));
	}

	public delete(key: string) {
		this.container.removeItem(key);
	}

	private serialize<T>(value: T) {
		return JSON.stringify(value);
	}

	private deserialize<T>(value: string) {
		return JSON.parse(value) as T;
	}
}

export const storage = new LocalStorage();
