import { GraphQLClient } from 'graphql-request';

if (!process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL) {
	throw new Error('CMS_GRAPHQL_API_URL environment variable is not defined');
}

export const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_CMS_GRAPHQL_API_URL}`, {
	mode: 'cors',
	keepalive: true,
	timeout: 20 * 1000,
});
