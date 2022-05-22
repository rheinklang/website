import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getAllEventSlugs, getUpcomingEvents } from '../../api/events';
import { PageLayout } from '../../components/layouts/PageLayout';
import { EventTimelinePageContent } from '../../components/pages/EventTimelinePageContent';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('eventTimeline');
	const contentProviderProps = await getContentProviderProps();
	const allEventSlugs = await getAllEventSlugs();
	const upcomingEvents = await getUpcomingEvents(100);

	return {
		props: {
			upcomingEvents,
			allEventSlugs,
			contentProviderProps,
		},
	};
}

const EventsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	upcomingEvents,
	contentProviderProps,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<EventTimelinePageContent upcomingEvents={upcomingEvents} />
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsPage.displayName = 'EventsPage';

export default EventsPage;
