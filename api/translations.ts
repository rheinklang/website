import { client, TranslationsDocument, TranslationsQuery } from '../graphql';

export const getTranslations = async () => {
	const result = await client.query<TranslationsQuery>({
		query: TranslationsDocument,
	});

	if (!result || !result.data) {
		return {};
	}

	return result.data.translationsCollection.reduce((prev, curr): Record<string, string> => {
		if (!curr || !curr.key) {
			return prev;
		}

		return {
			...prev,
			[curr.key]: curr.value || curr.key,
		};
	}, {} as Record<string, string>);
};
