import { ApolloClient, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { LocalStorageKeys, storage } from '../utils/localstorage';
import { Logger } from '../utils/logger';
import { isBrowser } from '../utils/ssr';

const logger = new Logger('useMemoryCacheUpdater');

export const useMemoryCacheUpdater = (apolloClient: ApolloClient<unknown>) => {
	const currentBuildId = process.env.CONFIG_BUILD_ID;

	const handleCacheUpdate = () => {
		storage.set(LocalStorageKeys.BUILD_ID, currentBuildId);
		storage.set(LocalStorageKeys.TIMETSTAMP, Date.now().toString());
	};

	useEffect(() => {
		if (isBrowser) {
			const previousBuildId = storage.get<string | undefined>(LocalStorageKeys.BUILD_ID);

			if (!previousBuildId) {
				handleCacheUpdate();
			}

			if (previousBuildId && previousBuildId !== currentBuildId) {
				logger.info(`Clearing cache due to build id change from ${previousBuildId} to ${currentBuildId}`);
				apolloClient.resetStore();
				handleCacheUpdate();
			}
		}
	});
};
