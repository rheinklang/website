import { client, MarketingBannerDocument, MarketingBannerQuery } from '../graphql';

export const getMarketingBanner = async () => {
	const result = await client.query<MarketingBannerQuery>({
		query: MarketingBannerDocument,
	});

	return result.data.marketingBannerSingleton || undefined;
};
