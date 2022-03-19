import {
	BlogPageDocument,
	BlogPageQuery,
	client,
	HomePageDocument,
	HomePageQuery,
	PortraitPageDocument,
	PortraitPageQuery,
} from '../graphql';

export const getHomePage = async () => {
	const result = await client.query<HomePageQuery>({
		query: HomePageDocument,
	});

	return result.data.homePageSingleton;
};

export const getBlogPage = async () => {
	const result = await client.query<BlogPageQuery>({
		query: BlogPageDocument,
	});

	return result.data.blogPageSingleton;
};

export const getPortraitPage = async () => {
	const result = await client.query<PortraitPageQuery>({
		query: PortraitPageDocument,
	});

	return result.data.portraitPageSingleton;
};
