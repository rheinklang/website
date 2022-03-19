import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EventType } from '../../../graphql';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { keys } from '../../../utils/structs';
import { getEventsByType, getUpcomingEvents } from '../../../api/events';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { Hero } from '../../../components/Hero';
import { useTranslation } from '../../../hooks/useTranslation';
import { StaticRoutes } from '../../../utils/routes';
import { Link } from '../../../components/Link';
import { Heading } from '../../../components/Heading';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const category = params && params.category ? params.category : undefined;
	const seoId = category ? `${category}Events` : 'events';
	const getContentProviderProps = getContextualContentProviderFetcher(seoId, {
		category: `${category || ''}`,
	});
	const contentProviderProps = await getContentProviderProps();
	const events = await getEventsByType(`${category}`);
	const nextRelevantEvents = await getUpcomingEvents(1, {
		type: category,
	});

	return {
		props: {
			events,
			nextRelevantEvent: nextRelevantEvents[0] || null,
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
						<Hero
							title={nextRelevantEvent.title}
							text={[nextRelevantEvent.excerpt]}
							primaryCta={{
								link: {
									href: `${StaticRoutes.EVENT_DETAIL}/${nextRelevantEvent.slug}`,
									children: translate('common.action.moreInformation'),
								},
							}}
						/>
					)}
					<ContentConstraint>
						<Heading level="1">{translate(`event.type.${category}`)}</Heading>
						<p className="text-xl font-bold">Work in progress: List Events in {category}</p>
						{events.map((event) => (
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
