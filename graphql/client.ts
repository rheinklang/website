import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

if (!process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL) {
	throw new Error('CMS_GRAPHQL_API_URL environment variable is not defined');
}

let sharedApolloClientInstance: ApolloClient<NormalizedCacheObject> | undefined;

export function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL,
			headers: {
				'Cockpit-Token': process.env.NEXT_PUBLIC_CMS_API_TOKEN,
			},
		}),
		cache: new InMemoryCache(),
		connectToDevTools: process.env.NODE_ENV !== 'production',
	});
}

export const client = sharedApolloClientInstance ?? createApolloClient();
