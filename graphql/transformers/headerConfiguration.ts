import { ApolloQueryResult } from '@apollo/client';
import { HeaderConfigurationQuery } from '../compiled/collection';

export const transformHeaderConfiguration = (queryResult: ApolloQueryResult<HeaderConfigurationQuery>) => {
	return queryResult.data?.headerConfigurationSingleton || undefined;
};
