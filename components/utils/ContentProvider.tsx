import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import Head from 'next/head';
import { FC } from 'react';
import { getHeaderConfiguration } from '../../api/header';
import { getMarketingBanner } from '../../api/marketing';
import { getSeoMetaData } from '../../api/seo';
import { getTranslations } from '../../api/translations';
import { client } from '../../graphql';
import { transformMarketingBanner } from '../../graphql/transformers/marketingBanner';
import { transformTranslationsIntoObject } from '../../graphql/transformers/translations';
import { transformHeaderConfiguration } from '../../graphql/transformers/headerConfiguration';
import { TranslationContext } from '../../hooks/useTranslation';
import { COCKPIT_IMAGER_URL, getCockpitImagerParams } from '../../utils/images';
import { getCurrentMaintenance } from '../../api/maintenance';
import { MaintenancePage } from '../pages/Maintenance';

export interface ContentProviderProps {
	translations: ReturnType<typeof transformTranslationsIntoObject>;
	seo: Awaited<ReturnType<typeof getSeoMetaData>>;
	marketingBanner: ReturnType<typeof transformMarketingBanner>;
	maintenance: Awaited<ReturnType<typeof getCurrentMaintenance>>;
	headerConfiguration: ReturnType<typeof transformHeaderConfiguration>;
	__APOLLO_CACHE__: NormalizedCacheObject;
}

export function getContextualContentProviderFetcher(pageId: string, seoVariables?: Record<string, string>) {
	/**
	 * Basic content provider for all pages.
	 *
	 * Maybe we should convert the return type to `Promise<GetStaticPropsResult<ContentProviderProps>>`
	 * to be able to handle redirects.
	 */
	return async (): Promise<ContentProviderProps> => {
		const translations = await getTranslations();
		const marketingBanner = await getMarketingBanner();
		const headerConfiguration = await getHeaderConfiguration();
		const seo = await getSeoMetaData(pageId, seoVariables, translations);
		const maintenance = await getCurrentMaintenance();

		return {
			translations,
			seo,
			marketingBanner,
			maintenance,
			headerConfiguration,
			__APOLLO_CACHE__: client.cache.extract(),
		};
	};
}

export const ContentProvider: FC<ContentProviderProps> = ({
	children,
	translations,
	seo,
	maintenance,
	__APOLLO_CACHE__,
}) => {
	client.cache.restore(__APOLLO_CACHE__);

	return (
		<ApolloProvider client={client}>
			<Head>
				{seo.title && (
					<>
						<title>Rheinklang - {seo.title}</title>
						<meta key="seo-og-title" property="og:title" content={seo.title} />
						<meta key="seo-twitter-title" property="twitter:title" content={seo.title} />
					</>
				)}
				{seo.description && (
					<>
						<meta key="seo-description" name="description" content={seo.description} />
						<meta key="seo-og-description" property="og:description" content={seo.description} />
						<meta key="seo-twitter-description" property="twitter:description" content={seo.description} />
					</>
				)}
				{seo.keywords && <meta key="seo-keywords" name="keywords" content={seo.keywords} />}
				{seo.crawler && <meta key="seo-robots" name="robots" content={seo.crawler} />}
				{seo.image && seo.image.path && (
					<>
						<meta
							key="seo-og-image"
							property="og:image"
							content={`${COCKPIT_IMAGER_URL}?${getCockpitImagerParams(seo.image.path, {
								width: 1200,
								height: 630,
								mask: 'crop',
							})}`}
						/>
						<meta
							key="seo-twitter-image"
							property="twitter:image"
							content={`${COCKPIT_IMAGER_URL}?${getCockpitImagerParams(seo.image.path, {
								width: 1600,
								height: 800,
								mask: 'crop',
							})}`}
						/>
					</>
				)}
			</Head>
			<TranslationContext.Provider value={translations}>
				{maintenance.isMaintenanceActive ? (
					<MaintenancePage title={maintenance.title} description={maintenance.description} />
				) : (
					children
				)}
			</TranslationContext.Provider>
		</ApolloProvider>
	);
};

ContentProvider.displayName = 'ContentProvider';
