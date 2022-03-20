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
	events,
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
					{nextRelevantEvent && (
						<RecommendedContentHero
							title={nextRelevantEvent.title}
							text={[nextRelevantEvent.excerpt]}
							link={`${StaticRoutes.EVENT_DETAIL}/${nextRelevantEvent.slug}`}
							date={nextRelevantEvent.date}
						/>
					)}
					<ContentConstraint>
						<Heading level="1">{translate(`event.type.${category}`)}</Heading>
						<p className="text-xl font-bold">Upcoming Events in {category}</p>
						{upcomingEvents.map((event) => (
							<p key={event.slug}>
								- Click me:
								<Link isStandalone href={`${StaticRoutes.EVENT_DETAIL}/${event.slug}`}>
									{event.title}
								</Link>
							</p>
						))}
						<p className="text-xl font-bold">Past Events in {category}</p>
						{pastEvents.map((event) => (
							<p key={event.slug}>
								- Click me:
								<Link isStandalone href={`${StaticRoutes.EVENT_DETAIL}/${event.slug}`}>
									{event.title}
								</Link>
							</p>
						))}
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsCategoryPage.displayName = 'EventsPage';

export default EventsCategoryPage;
