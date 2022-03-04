import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import Head from 'next/head';
import { FC } from 'react';
import { getHeaderConfiguration } from '../../api/header';
import { getMarketingBanner } from '../../api/marketing';
import { getDefaultSeo, getSeoForPageId } from '../../api/seo';
import { getTranslations } from '../../api/translations';
import { client, HeaderConfigurationQuery, MarketingBannerQuery } from '../../graphql';
import { transformMarketingBanner } from '../../graphql/transformers/marketingBanner';
import { transformMergeSeo } from '../../graphql/transformers/seo';
import { transformTranslationsIntoObject } from '../../graphql/transformers/translations';
import { transformHeaderConfiguration } from '../../graphql/transformers/headerConfiguration';
import { TranslationContext } from '../../hooks/useTranslation';

export interface ContentProviderProps {
	translations: ReturnType<typeof transformTranslationsIntoObject>;
	seo: ReturnType<typeof transformMergeSeo>;
	marketingBanner: ReturnType<typeof transformMarketingBanner>;
	headerConfiguration: ReturnType<typeof transformHeaderConfiguration>;
	__APOLLO_CACHE__: NormalizedCacheObject;
}

export function getContextualContentProviderFetcher(pageId: string) {
	return async (): Promise<ContentProviderProps> => {
		const translationsQueryResult = await getTranslations();
		const seoDefaultQueryResult = await getDefaultSeo();
		const seoPageQueryResult = await getSeoForPageId(pageId);
		const marketingBannerQueryResult = await getMarketingBanner();
		const headerConfigurationQueryResult = await getHeaderConfiguration();

		const translations = transformTranslationsIntoObject(translationsQueryResult);
		const seo = transformMergeSeo(seoDefaultQueryResult, seoPageQueryResult);
		const marketingBanner = transformMarketingBanner(marketingBannerQueryResult);
		const headerConfiguration = transformHeaderConfiguration(headerConfigurationQueryResult);

		return {
			translations,
			seo,
			marketingBanner,
			headerConfiguration,
			__APOLLO_CACHE__: client.cache.extract(),
		};
	};
}

export const ContentProvider: FC<ContentProviderProps> = ({ children, translations, seo, __APOLLO_CACHE__ }) => {
	client.cache.restore(__APOLLO_CACHE__);

	return (
		<ApolloProvider client={client}>
			{seo && (
				<Head>
					<meta property="og:type" content="website" />
					<meta property="og:locale" content="de_CH" />
					<meta property="og:site_name" content="Rheinklang" />
					{seo.title && (
						<>
							<title>Rheinklang - {seo.title}</title>
							<meta property="og:title" content={seo.title} />
						</>
					)}
					{seo.description && (
						<>
							<meta name="description" content={seo.description} />
							<meta property="og:description" content={seo.description} />
						</>
					)}
					{seo.keywords && <meta name="keywords" content={seo.keywords.join(',')} />}
					{seo.crawler && <meta name="robots" content={seo.crawler} />}
					{seo.image && seo.image.path && <meta property="og:image" content={seo.image.path} />}
				</Head>
			)}
			<TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>
		</ApolloProvider>
	);
};

ContentProvider.displayName = 'ContentProvider';
