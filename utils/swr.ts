import type { RequestDocument } from 'graphql-request';
import type { Cache, Fetcher } from 'swr';
import { client } from '../graphql/client';
import { LocalStorage, LocalStorageKeys } from './localstorage';

export const localStorageCacheProvider = (): Cache => {
	const storage = new LocalStorage();
	const cache = new Map(storage.get<any[]>(LocalStorageKeys.SWR_CACHE, []));

	if (typeof window !== 'undefined') {
		window.addEventListener('beforeunload', () => {
			storage.set(LocalStorageKeys.SWR_CACHE, Array.from(cache.entries()));
		});
	}

	return cache;
};

/**
 * SWR Fetcher to use with GraphQL and the Cockpit CMS
 * @template TVariables - The type of the variables to pass to the query
 * @param {RequestDocument} requestDocument - The GraphQL query to execute
 * @param {TVariables} variables - The variables to pass to the GraphQL query
 * @returns The result of the request
 */
export const cmsDataFetcher: Fetcher = async <TVariables extends Record<string, any>>(
	requestDocument: RequestDocument,
	variables?: TVariables
) => {
	try {
		const response = await client.request(requestDocument, variables);
		return response;
	} catch (error) {
		console.error(`[GraphQL]`, error);
		return error;
	}
};
