import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { PageLayout } from '../../../components/layouts/PageLayout';
import {
	ContentProvider,
	ContentProviderStaticSEOVariables,
	getContextualContentProviderFetcher,
} from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getAllEventSlugs, getEventBySlug } from '../../../api/events';
import { Richtext } from '../../../components/Richtext';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { formatDate, formatDateRange, parseCockpitDate } from '../../../utils/date';
import { Heading } from '../../../components/Heading';
import { Link } from '../../../components/Link';
import { StaticRoutes } from '../../../utils/routes';
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, TicketIcon } from '@heroicons/react/24/outline';
import { ButtonGroup } from '../../../components/ButtonGroup';
import { Button } from '../../../components/Button';
import { Map } from '../../../components/maps/Map';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem';
import { useTranslation } from '../../../hooks/useTranslation';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const slug = params && params.slug ? `${params.slug}` : undefined;
	const event = await getEventBySlug(`${slug}`);

	const contentProviderProps = await getContextualContentProviderFetcher('event', {
		title: event.title,
		excerpt: event.excerpt,
		[ContentProviderStaticSEOVariables.OG_IMAGE]: event.image?.path || undefined,
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

const EVentDetailPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	event,
	contentProviderProps,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);

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
					<Breadcrumb>
						<BreadcrumbItem href={`${StaticRoutes.EVENTS}`}>Events</BreadcrumbItem>
						<BreadcrumbItem href={`${StaticRoutes.EVENT_CATEGORY}/${event.type}`}>
							{translate(`event.type.${event.type}`)}
						</BreadcrumbItem>
						<BreadcrumbItem isCurrent href="#">
							{event.title}
						</BreadcrumbItem>
					</Breadcrumb>
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
						<section>
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
						</section>
						{event.location && event.location.lat && event.location.lng && (
							<section className="mt-12">
								<div className="h-96 w-full rounded-xl overflow-clip shadow-xl">
									<Map coordinates={[event.location.lng, event.location.lat]} title={event.title} />
								</div>
							</section>
						)}
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EVentDetailPage.displayName = 'EventsPage';

export default EVentDetailPage;
