import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import {
	EventCategorySlugsDocument,
	EventCategorySlugsLazyQueryHookResult,
	EventCategorySlugsQuery,
	SeoDefaultValuesDocument,
	useSeoWithFilterQuery,
} from '../../../graphql';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { client } from '../../../graphql';
import Head from 'next/head';
import { compileStringTemplate } from '../../../utils/templating';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const seoId = params && params.category ? `${params.category}Events` : 'fallback';
	const getContentProviderProps = getContextualContentProviderFetcher(seoId);
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await client.query<EventCategorySlugsQuery>({
		query: EventCategorySlugsDocument,
	});

	const slugs = response.data.eventCategoriesCollection.map((item) => item?.slug).filter(Boolean);

	return {
		fallback: false,
		paths: slugs.map((slug) => ({
			params: { category: slug },
		})),
	};
};

const EventsCategoryPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
}) => {
	const router = useRouter();
	const { seo } = contentProviderProps;
	const { category } = router.query;

	return (
		<ErrorBoundary route={router.asPath}>
			<Head>
				<title>
					{compileStringTemplate(seo.title, {
						category: category,
					})}
				</title>
			</Head>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<p>Events in {category}</p>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsCategoryPage.displayName = 'EventsPage';

export default EventsCategoryPage;
