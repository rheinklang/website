import { ApolloQueryResult } from '@apollo/client';
import { TranslationsQuery } from '../compiled/collection';

export function transformTranslationsIntoObject(queryResult: ApolloQueryResult<TranslationsQuery | undefined>) {
	if (!queryResult || !queryResult.data) {
		return {};
	}

	return queryResult.data.translationsCollection.reduce((prev, curr) => {
		if (!curr || !curr.key) {
			return prev;
		}

		return {
			...prev,
			[curr.key]: curr.value,
		};
	}, {});
}
