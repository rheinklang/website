import { client, ArticleCategoriesForFilterQuery, ArticleCategoriesForFilterDocument } from '../graphql';
import { nonNullish } from '../utils/filter';

export const getArticleCategoriesForFilter = async () => {
	const result = await client.query<ArticleCategoriesForFilterQuery>({
		query: ArticleCategoriesForFilterDocument,
	});

	return result.data.articleCategoriesCollection.filter(nonNullish);
};
