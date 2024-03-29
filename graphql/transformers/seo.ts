import { ApolloQueryResult } from '@apollo/client';
import { SeoDefaultValuesQuery, SeoWithFilterQuery } from '../compiled/collection';

export function transformMergeSeo(
	defaultQueryResult: ApolloQueryResult<SeoDefaultValuesQuery | undefined>,
	pageQueryResult: ApolloQueryResult<SeoWithFilterQuery | undefined>
) {
	const defaults = defaultQueryResult.data!.seoCollection[0];
	const specific = pageQueryResult.data!.seoCollection[0];

	return {
		title: (specific && specific.title) || (defaults && defaults.title) || '',
		description: (specific && specific.description) || (defaults && defaults.description) || '',
		image: (specific && specific.image) || (defaults && defaults.image) || undefined,
		author: (specific && specific.author) || (defaults && defaults.author) || '',
		crawler: (specific && specific.crawler) || (defaults && defaults.crawler) || '',
		keywords: [
			...(defaults && defaults.keywords ? defaults.keywords : []),
			...(specific && specific.keywords ? specific.keywords : []),
		].filter((val, index, self) => self.indexOf(val) === index),
	};
}
