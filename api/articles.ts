import {
	ArticlesDocument,
	ArticlesQuery,
	AllArticleSlugsQuery,
	AllArticleSlugsDocument,
	ArticleByFilterQuery,
	ArticleByFilterDocument,
	client,
} from '../graphql';
import { nonNullish } from '../utils/filter';

export const getPaginatedArticles = async (page: number, amountToLoad: number) => {
	const limit = amountToLoad * 2; /* workaround to get enough articles */
	const skip = (page - 1) * amountToLoad; // we want to start at 0, not 1

	const result = await client.query<ArticlesQuery>({
		query: ArticlesDocument,
		variables: {
			limit,
			skip,
			sort: { _created: -1 },
		},
	});

	return result.data.articlesCollection.filter(nonNullish).slice(0, amountToLoad);
};

export const getAllArticleSlugs = async () => {
	const result = await client.query<AllArticleSlugsQuery>({
		query: AllArticleSlugsDocument,
	});

	return result.data.articlesCollection.filter(nonNullish).map((article) => article.slug);
};

export const getArticleBySlug = async (slug: string) => {
	const result = await client.query<ArticleByFilterQuery>({
		query: ArticleByFilterDocument,
		variables: {
			filter: { slug },
		},
	});

	return result.data.articlesCollection.filter(nonNullish)[0];
};
