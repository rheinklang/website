import type { NextPage, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import {
	EventCategorySlugsDocument,
	EventCategorySlugsLazyQueryHookResult,
	EventCategorySlugsQuery,
} from '../../../graphql';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContentProviderPropsGetterForPage } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { client } from '../../../graphql';

export async function getStaticProps() {
	const getContentProviderProps = getContentProviderPropsGetterForPage('http500');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

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
