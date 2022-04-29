import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getAllEventSlugs, getEventBySlug } from '../../../api/events';
import { Richtext } from '../../../components/Richtext';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { formatDate, formatDateRange, parseCockpitDate } from '../../../utils/date';
import { Heading } from '../../../components/Heading';
import { Link } from '../../../components/Link';
import { StaticRoutes } from '../../../utils/routes';
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, TicketIcon } from '@heroicons/react/outline';
import { ButtonGroup } from '../../../components/ButtonGroup';
import { Button } from '../../../components/Button';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const slug = params && params.slug ? `${params.slug}` : undefined;
	const event = await getEventBySlug(`${slug}`);

	const contentProviderProps = await getContextualContentProviderFetcher('event', {
		title: event.title,
		excerpt: event.excerpt,
	})();

	return {
		props: {
			slug,
			event,
			contentProviderProps,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getAllEventSlugs();

	return {
		fallback: false,
		paths: slugs.map((slug) => ({
			params: { slug },
		})),
	};
};

const EventsCategoryPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	event,
	contentProviderProps,
}) => {
	const router = useRouter();

	const date = useMemo(() => {
		if (event.date && event.endDate) {
			return formatDateRange(event.date, event.endDate);
		}

		if (event.date) {
			return `Am ${formatDate(event.date)}`;
		}

		return null;
	}, [event]);

	// const isEventPast = useMemo(() => {
	// 	return isPast(parseCockpitDate(event.endDate || event.date));
	// }, [event.date, event.endDate]);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<ContentConstraint tag="article" className="py-12 md:py-16 lg:py-20 lg:max-w-7xl">
						<Link
							className="text-sea-green-400"
							href={`${StaticRoutes.EVENT_CATEGORY}/${event.type}`}
							icon={<ArrowLeftIcon className="inline-block h-4 mr-2 align-text-top" />}
							iconPositon="pre"
						>
							Zurück zu den Events
						</Link>
						<header className="my-8">
							<Heading level="1" className="mb-1">
								{event.title}
							</Heading>
							<p className="text-xl text-gray-500">{date}</p>
							{event.location && (
								<p className="text-sm mt-1 text-gray-400">
									{event.location.name}, {event.location.city}, {event.location.country}
								</p>
							)}
						</header>
						<Richtext as="section" content={event.content} />
						<footer>
							<ButtonGroup className="md:w-fit mt-8 items-start">
								{event.ticketingUrl && (
									<Button
										link={{
											href: event.ticketingUrl,
											icon: <TicketIcon className="inline h-5 ml-2" />,
										}}
									>
										Tickets Kaufen
									</Button>
								)}
								{event.facebookEventUrl && (
									<Button
										type="secondary"
										link={{
											href: event.facebookEventUrl,
											icon: <ArrowRightIcon className="inline h-5 ml-2" />,
										}}
									>
										Facebook
									</Button>
								)}
							</ButtonGroup>
						</footer>
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsCategoryPage.displayName = 'EventsPage';

export default EventsCategoryPage;
