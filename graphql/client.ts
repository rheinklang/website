import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';

if (!process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL) {
	throw new Error('CMS_GRAPHQL_API_URL environment variable is not defined');
}

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			'Cockpit-Token': process.env.NEXT_PUBLIC_CMS_API_TOKEN,
		},
	}));

	return forward(operation);
});

// export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL}`, {
// 	mode: 'cors',
// 	keepalive: true,
// 	timeout: 20 * 1000,
// });

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: concat(authMiddleware, httpLink),
	connectToDevTools: process.env.NODE_ENV !== 'production',
});
