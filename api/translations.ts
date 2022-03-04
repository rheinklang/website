import { client, TranslationsDocument, TranslationsQuery } from '../graphql';

export const getTranslations = () =>
	client.query<TranslationsQuery>({
		query: TranslationsDocument,
	});
