import { ArticlesDocument, ArticlesQuery, client } from '../graphql';
import { nonNullish } from '../utils/filter';

export const getPaginatedArticles = async (page: number, amountToLoad: number) => {
	const limit = amountToLoad;
	const skip = (page - 1) * limit; // we want to start at 0, not 1

	const result = await client.query<ArticlesQuery>({
		query: ArticlesDocument,
		variables: {
			limit,
			skip,
		},
	});

	return result.data.articlesCollection.filter(nonNullish);
};
