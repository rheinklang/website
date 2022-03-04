import {
	client,
	SeoDefaultValuesDocument,
	SeoDefaultValuesQuery,
	SeoWithFilterDocument,
	SeoWithFilterQuery,
} from '../graphql';

export const getDefaultSeo = () =>
	client.query<SeoDefaultValuesQuery>({
		query: SeoDefaultValuesDocument,
	});

export const getSeoForPageId = (pageId: string) =>
	client.query<SeoWithFilterQuery>({
		query: SeoWithFilterDocument,
		variables: {
			filter: { id: pageId },
		},
	});
