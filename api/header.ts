import { client, HeaderConfigurationDocument, HeaderConfigurationQuery } from '../graphql';

export const getHeaderConfiguration = () =>
	client.query<HeaderConfigurationQuery>({
		query: HeaderConfigurationDocument,
	});
