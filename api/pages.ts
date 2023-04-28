import {
	BlogPageDocument,
	BlogPageQuery,
	client,
	HomePageDocument,
	HomePageQuery,
	PartnerPageDocument,
	PartnerPageQuery,
	PortraitPageDocument,
	PortraitPageQuery,
	DiscordPageQuery,
	DiscordPageDocument,
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

export const getPartnerPage = async () => {
	const result = await client.query<PartnerPageQuery>({
		query: PartnerPageDocument,
	});

	return result.data.partnerPageSingleton;
};

export const getDiscordPage = async () => {
	const result = await client.query<DiscordPageQuery>({
		query: DiscordPageDocument,
	});

	return result.data.discordPageSingleton;
};
