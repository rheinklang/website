import { client, MarketingBannerDocument, MarketingBannerQuery } from '../graphql';

export const getMarketingBanner = () =>
	client.query<MarketingBannerQuery>({
		query: MarketingBannerDocument,
	});
