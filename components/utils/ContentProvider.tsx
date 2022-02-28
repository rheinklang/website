import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import Head from 'next/head';
import { FC } from 'react';
import {
	client,
	HeaderConfigurationDocument,
	HeaderConfigurationQuery,
	HeaderConfigurationQueryResult,
	MarketingBannerDocument,
	MarketingBannerQuery,
	MarketingBannerQueryResult,
	SeoDefaultValuesDocument,
	SeoDefaultValuesQuery,
	SeoForIdDocument,
	SeoForIdQuery,
	TranslationsDocument,
	TranslationsQuery,
} from '../../graphql';
import { transformMergeSeo } from '../../graphql/transformers/seo';
import { transformTranslationsIntoObject } from '../../graphql/transformers/translations';
import { TranslationContext } from '../../hooks/useTranslation';
import type { MarketingBannerProps } from '../MarketingBanner';

export interface ContentProviderProps {
	translations: ReturnType<typeof transformTranslationsIntoObject>;
	seo: ReturnType<typeof transformMergeSeo>;
	apolloCache: NormalizedCacheObject;
	marketingBanner: MarketingBannerQuery['marketingBannerSingleton'];
	headerConfiguration: HeaderConfigurationQuery['headerConfigurationSingleton'];
}

export function getContentProviderPropsGetterForPage(pageId: string) {
	return async (): Promise<ContentProviderProps> => {
		const translationsQueryResult = await client.query<TranslationsQuery>({
			query: TranslationsDocument,
		});

		const seoDefaultQueryResult = await client.query<SeoDefaultValuesQuery>({
			query: SeoDefaultValuesDocument,
		});

		const seoPageQueryResult = await client.query<SeoForIdQuery>({
			query: SeoForIdDocument,
			variables: {
				id: pageId,
			},
		});

		const marketingBannerQueryResult = await client.query<MarketingBannerQuery>({
			query: MarketingBannerDocument,
		});

		const headerConfigurationQueryResult = await client.query<HeaderConfigurationQuery>({
			query: HeaderConfigurationDocument,
		});

		const translations = transformTranslationsIntoObject(translationsQueryResult);
		const seo = transformMergeSeo(seoDefaultQueryResult, seoPageQueryResult);

		return {
			translations,
			seo,
			marketingBanner: marketingBannerQueryResult.data.marketingBannerSingleton,
			headerConfiguration: headerConfigurationQueryResult.data.headerConfigurationSingleton,
			apolloCache: client.cache.extract(),
		};
	};
}

export const ContentProvider: FC<ContentProviderProps> = ({ children, translations, seo, apolloCache }) => {
	client.cache.restore(apolloCache);

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
