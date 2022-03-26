import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { EventType } from '../../../graphql';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { keys } from '../../../utils/structs';
import { getEventsByType, getUpcomingEvents } from '../../../api/events';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { useTranslation } from '../../../hooks/useTranslation';
import { StaticRoutes } from '../../../utils/routes';
import { Link } from '../../../components/Link';
import { Heading } from '../../../components/Heading';
import { RecommendedContentHero } from '../../../components/RecommendedContentHero';
import { parseCockpitDate } from '../../../utils/date';
import { EventTeaser } from '../../../components/EventTeaser';
import { ContentHeader } from '../../../components/ContentHeader';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const category = params && params.category ? params.category : undefined;
	const getContentProviderProps = getContextualContentProviderFetcher('eventCategory', {
		category: category ? `translate:navigation.events.${category}s` : 'Unbekannt', // TODO: We need to fix that "s"
	});
	const contentProviderProps = await getContentProviderProps();
	const events = await getEventsByType(`${category}`);
	const nextRelevantEvents = await getUpcomingEvents(1, {
		type: category,
	});

	// Aggregation of partial content

	const pastEvents = events.filter((ev) => (parseCockpitDate(ev.date) < new Date() ? true : false));
	const upcomingEvents = events.filter((ev) => (parseCockpitDate(ev.date) < new Date() ? false : true));

	const maybeNextRelevantEvent = nextRelevantEvents.length > 0 ? nextRelevantEvents[0] : undefined;
	const nextRelevantEvent =
		maybeNextRelevantEvent && parseCockpitDate(maybeNextRelevantEvent.date) > new Date()
			? maybeNextRelevantEvent
			: null;

	return {
		props: {
			events,
			pastEvents,
			upcomingEvents,
			nextRelevantEvent,
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
	upcomingEvents,
	pastEvents,
	nextRelevantEvent,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);
	const { category } = router.query;

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<ContentHeader title={translate(`event.type.${category}`)} />
					{nextRelevantEvent && (
						<RecommendedContentHero
							title={nextRelevantEvent.title}
							text={[nextRelevantEvent.excerpt]}
							link={`${StaticRoutes.EVENT_DETAIL}/${nextRelevantEvent.slug}`}
							date={nextRelevantEvent.date}
						/>
					)}

					<ContentConstraint>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
							{upcomingEvents.map((event) => (
								<EventTeaser
									key={event._id}
									date={event.date}
									endDate={event.endDate}
									title={event.title}
									image={event.image!.path}
									description={event.excerpt}
									slug={event.slug}
									isCanceled={event.isCanceled}
									ticketingUrl={event.ticketingUrl}
								/>
							))}
						</div>
					</ContentConstraint>

					<div className="bg-gray-100">
						<ContentConstraint useCustomYSpace className="py-16 lg:py-24 border-b border-gray-800">
							<Heading level="2" className="text-center mb-12">
								Vergangene Events
							</Heading>
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
								{pastEvents.map((event) => (
									<EventTeaser
										key={event._id}
										title={event.title}
										image={event.image!.path}
										description={event.excerpt}
										slug={event.slug}
										isCanceled={event.isCanceled}
									/>
								))}
							</div>
						</ContentConstraint>
					</div>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsCategoryPage.displayName = 'EventsPage';

export default EventsCategoryPage;
