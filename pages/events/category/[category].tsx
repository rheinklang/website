import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EventType } from '../../../graphql';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { keys } from '../../../utils/structs';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const category = params && params.category ? params.category : undefined;
	const seoId = category ? `${category}Events` : 'events';
	const getContentProviderProps = getContextualContentProviderFetcher(seoId, {
		category: `${category || ''}`,
	});
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = keys(EventType)
		.map((item) => EventType[item])
		.filter(Boolean);

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
	const { category } = router.query;

	return (
		<ErrorBoundary route={router.asPath}>
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
