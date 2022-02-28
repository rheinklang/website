import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContentProviderPropsGetterForPage } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';

export async function getStaticProps() {
	const getContentProviderProps = getContentProviderPropsGetterForPage('http500');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const EventsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<p>Events</p>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsPage.displayName = 'EventsPage';

export default EventsPage;
