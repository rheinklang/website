import {
	ApolloClient,
	ApolloLink,
	DefaultOptions,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { print } from 'graphql/language/printer';

import { RetryLink } from '@apollo/client/link/retry';
import { ErrorLink } from '@apollo/client/link/error';
import { Logger } from '../utils/logger';

if (!process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL) {
	throw new Error('CMS_GRAPHQL_API_URL environment variable is not defined');
}

let sharedApolloClientInstance: ApolloClient<NormalizedCacheObject> | undefined;

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'cache-first',
		errorPolicy: 'all',
	},
};

const consoleDebugLink = new ApolloLink((operation, forward) => {
	console.log(`Variables: ${JSON.stringify(operation.variables)}`);
	console.log(`Query`, print(operation.query));

	return forward(operation);
});

export function createApolloClient() {
	const logger = new Logger('Apollo');

	const connectionLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL,
		headers: {
			'Cockpit-Token': process.env.NEXT_PUBLIC_CMS_API_TOKEN,
		},
	});

	const retryLink = new RetryLink({
		attempts: {
			max: 2,
			retryIf: (_error, _operation) => {
				// TODO: Filter error types for retry
				return true;
			},
		},
		delay: {
			initial: 300,
			max: 10 * 1000,
			jitter: true,
		},
	});

	const errorLink = new ErrorLink(({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				switch (err.extensions.code) {
					case 'UNAUTHENTICATED':
						break;
					default:
						return forward(operation);
				}
			}
		}

		if (networkError) {
			logger.error(networkError, {
				level: 'error',
				context: `${operation.operationName}`,
				data: {
					operationContext: operation.getContext(),
				},
			});
		}
	});

	return new ApolloClient({
		defaultOptions,
		ssrMode: typeof window === 'undefined',
		link: ApolloLink.from([consoleDebugLink, errorLink, retryLink, connectionLink]),
		cache: new InMemoryCache(),
		connectToDevTools: process.env.NODE_ENV !== 'production',
	});
}

export const client = sharedApolloClientInstance ?? createApolloClient();
