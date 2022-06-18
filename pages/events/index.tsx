import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getAllEventSlugs, getEventOverview } from '../../api/events';
import { ContentConstraint } from '../../components/ContentConstraint';
import { EventCategoryCard } from '../../components/EventCategoryCard';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { StaticRoutes } from '../../utils/routes';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('eventsOverview');
	const contentProviderProps = await getContentProviderProps();
	const allEventSlugs = await getAllEventSlugs();
	const eventOverviews = await getEventOverview();

	return {
		props: {
			allEventSlugs,
			eventOverviews,
			contentProviderProps,
		},
	};
}

const transforms: Record<number, string> = {
	0: 'lg:col-span-full lg:scale-105 lg:-rotate-3 lg:hover:scale-125 lg:hover:rotate-3',
	1: 'lg:col-span-2 lg:translate-y-24 lg:-translate-x-24 lg:scale-125 lg:rotate-6 lg:hover:scale-150 lg:hover:-rotate-6',
	2: 'lg:col-span-3 lg:translate-x-28 lg:-translate-y-20 lg:rotate-3 hover:scale-110 lg:hover:-translate-y-14 lg:hover:-rotate-3',
	3: 'lg:col-span-2 lg:translate-x-24 lg:translate-y-12 lg:-rotate-1 hover:scale-125 lg:hover:translate-y-14 lg:hover:rotate-3',
};

const EventsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	eventOverviews,
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
					<div className="bg-black text-white border-t border-b border-gray-800">
						<ContentConstraint useCustomYSpace className="py-12 lg:pt-24 lg:pb-12">
							<div className="relative mx-auto max-w-3xl gap-8 lg:grid lg:grid-flow-col lg:grid-rows-3 lg:grid-cols-4">
								{eventOverviews.map(({ category, image, title }, index) => (
									<EventCategoryCard
										key={`${category}-${index}`}
										title={title}
										href={`${StaticRoutes.EVENT_CATEGORY}/${category}`}
										image={image.path}
										className={classNames(transforms[index], 'mb-12 lg:mb-0')}
									/>
								))}
								{/* <EventCategoryCard
									title="Rheinklang Festival"
									href="#"
									className="col-span-4 scale-105 -rotate-3 hover:scale-125 hover:rotate-3"
								/>
								<EventCategoryCard
									title="Showcases"
									href="#"
									className=" col-span-2 translate-y-24 -translate-x-24 scale-125 rotate-6 hover:scale-150 hover:-rotate-6"
								/>
								<EventCategoryCard
									title="Kooperationen"
									href="#"
									className="col-span-3 translate-x-28 -translate-y-20 rotate-3 hover:scale-110 hover:-translate-y-14 hover:-rotate-3"
								/>
								<EventCategoryCard
									title="DayDances"
									href="#"
									className="col-span-2 translate-x-24 translate-y-12 -rotate-1 hover:scale-125 hover:translate-y-14 hover:rotate-3"
								/> */}
							</div>
						</ContentConstraint>
					</div>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

EventsPage.displayName = 'EventsPage';

export default EventsPage;
