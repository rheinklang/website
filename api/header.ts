import { client, HeaderConfigurationDocument, HeaderConfigurationQuery } from '../graphql';

export const getHeaderConfiguration = async () => {
	const result = await client.query<HeaderConfigurationQuery>({
		query: HeaderConfigurationDocument,
	});

	return result.data.headerConfigurationSingleton || undefined;
};
