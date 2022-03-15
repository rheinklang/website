import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EventType } from '../../../graphql';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { keys } from '../../../utils/structs';

export const getStaticProps = async ({}: GetStaticPropsContext) => {
	const getContentProviderProps = getContextualContentProviderFetcher('impression');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// const slugs = keys(EventType)
	// 	.map((item) => EventType[item])
	// 	.filter(Boolean);
	const slugs: string[] = [];

	return {
		fallback: false,
		paths: slugs.map((slug) => ({
			params: { slug },
		})),
	};
};

const EventsImperssionsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
}) => {
	const router = useRouter();
	const { category } = router.query;

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps} seoVariables={{ category: `${category}` }}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<p>EventsImperssionsPage</p>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsImperssionsPage.displayName = 'EventsImperssionsPage';

export default EventsImperssionsPage;
