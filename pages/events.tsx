import type { NextPage } from 'next';
import { PageLayout } from '../components/layouts/PageLayout';
import { ContentProvider, getContentProviderPropsGetterForPage } from '../components/utils/ContentProvider';

export async function getStaticProps() {
	const getContentProviderProps = getContentProviderPropsGetterForPage('http500');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const EventsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => (
	<ContentProvider {...contentProviderProps}>
		<PageLayout
			marketingBanner={contentProviderProps.marketingBanner}
			cta={contentProviderProps.headerConfiguration.cta}
		>
			<p>Events</p>
		</PageLayout>
	</ContentProvider>
);

EventsPage.displayName = 'EventsPage';

export default EventsPage;
