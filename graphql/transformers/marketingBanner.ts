import { ApolloQueryResult } from '@apollo/client';
import { MarketingBannerQuery } from '../compiled/collection';

export const transformMarketingBanner = (queryResult: ApolloQueryResult<MarketingBannerQuery>) => {
	return queryResult.data?.marketingBannerSingleton || undefined;
};
