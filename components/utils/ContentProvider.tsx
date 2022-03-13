import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import Head from 'next/head';
import { FC } from 'react';
import { getHeaderConfiguration } from '../../api/header';
import { getMarketingBanner } from '../../api/marketing';
import { getDefaultSeo, getSeoForPageId, getSeoMetaData } from '../../api/seo';
import { getTranslations } from '../../api/translations';
import { client, HeaderConfigurationQuery, MarketingBannerQuery } from '../../graphql';
import { transformMarketingBanner } from '../../graphql/transformers/marketingBanner';
import { transformMergeSeo } from '../../graphql/transformers/seo';
import { transformTranslationsIntoObject } from '../../graphql/transformers/translations';
import { transformHeaderConfiguration } from '../../graphql/transformers/headerConfiguration';
import { TranslationContext } from '../../hooks/useTranslation';
import { isBrowser } from '../../utils/ssr';
import { SeoTags } from './SeoTags';
import { COCKPIT_IMAGER_URL, getCockpitImagerParams } from '../../utils/images';

export interface ContentProviderProps {
	translations: ReturnType<typeof transformTranslationsIntoObject>;
	seo: Awaited<ReturnType<typeof getSeoMetaData>>;
	seoVariables?: Record<string, string>;
	marketingBanner: ReturnType<typeof transformMarketingBanner>;
	headerConfiguration: ReturnType<typeof transformHeaderConfiguration>;
	__APOLLO_CACHE__: NormalizedCacheObject;
}

export function getContextualContentProviderFetcher(pageId: string, seoVariables?: Record<string, string>) {
	return async (): Promise<ContentProviderProps> => {
		const translations = await getTranslations();
		const marketingBanner = await getMarketingBanner();
		const headerConfiguration = await getHeaderConfiguration();
		const seo = await getSeoMetaData(pageId, seoVariables);

		return {
			translations,
			seo,
			marketingBanner,
			headerConfiguration,
			__APOLLO_CACHE__: client.cache.extract(),
		};
	};
}

export const ContentProvider: FC<ContentProviderProps> = ({
	children,
	translations,
	seo,
	seoVariables,
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
					</>
				)}
				{seo.description && (
					<>
						<meta key="seo-description" name="description" content={seo.description} />
						<meta key="seo-og-description" property="og:description" content={seo.description} />
					</>
				)}
				{seo.keywords && <meta key="seo-keywords" name="keywords" content={seo.keywords} />}
				{seo.crawler && <meta key="seo-robots" name="robots" content={seo.crawler} />}
				{seo.image && seo.image.path && (
					<meta
						key="seo-og-image"
						property="og:image"
						content={`${COCKPIT_IMAGER_URL}?${getCockpitImagerParams(seo.image.path, {
							width: 1200,
							height: 630,
							mask: 'crop',
						})}`}
					/>
				)}
			</Head>
			<TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>
		</ApolloProvider>
	);
};

ContentProvider.displayName = 'ContentProvider';
