import { ApolloQueryResult } from '@apollo/client';
import { SeoDefaultValuesQuery, SeoForIdQuery } from '../compiled/collection';

export function transformMergeSeo(
	defaultQueryResult: ApolloQueryResult<SeoDefaultValuesQuery | undefined>,
	pageQueryResult: ApolloQueryResult<SeoForIdQuery | undefined>
) {
	const defaults = defaultQueryResult.data!.seoCollection[0];
	const specific = pageQueryResult.data!.seoCollection[0];

	return {
		title: (specific && specific.title) || (defaults && defaults.title) || '',
		description: (specific && specific.description) || (defaults && defaults.description) || '',
		image: (specific && specific.image) || (defaults && defaults.image) || '',
		author: (specific && specific.author) || (defaults && defaults.author) || '',
		crawler: (specific && specific.crawler) || (defaults && defaults.crawler) || '',
		keywords: [
			...(defaults && defaults.keywords ? defaults.keywords : []),
			...(specific && specific.keywords ? specific.keywords : []),
		],
	};
}
