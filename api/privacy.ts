import { client, PrivacyPageDataQuery, PrivacyPageDataDocument } from '../graphql';

export const getPrivacyPageData = async () => {
	const result = await client.query<PrivacyPageDataQuery>({
		query: PrivacyPageDataDocument,
	});

	return result.data.privacyPageSingleton;
};
