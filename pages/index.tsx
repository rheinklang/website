import { ArrowRightIcon, TicketIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPaginatedArticles } from '../api/articles';
import { getUpcomingEvents } from '../api/events';
import { getHomePage } from '../api/pages';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { ContentConstraint } from '../components/ContentConstraint';
import { EventExcerpt } from '../components/EventExcerpt';
import { Hero } from '../components/Hero';
import { PageLayout } from '../components/layouts/PageLayout';
import { getContextualContentProviderFetcher, ContentProvider } from '../components/utils/ContentProvider';
import { ErrorBoundary } from '../components/utils/ErrorBoundary';
import { useTranslation } from '../hooks/useTranslation';
import { parseCockpitDate } from '../utils/date';
import { StaticRoutes } from '../utils/routes';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('home');
	const contentProviderProps = await getContentProviderProps();
	const latestArticles = await getPaginatedArticles(0, 3);
	const nextEvents = await getUpcomingEvents(3);
	const pageData = await getHomePage();

	return {
		props: {
			contentProviderProps,
			latestArticles,
			nextEvents,
			pageData,
		},
	};
}

const HomePage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	latestArticles,
	nextEvents,
	pageData,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					{pageData.eventShowcase && (
						<Hero
							title={pageData.eventShowcase.title}
							text={[pageData.eventShowcase.excerpt]}
							image={pageData.eventShowcase.image?.path}
							primaryCta={{
								link: {
									href: `${StaticRoutes.EVENT_DETAIL}/${pageData.eventShowcase.slug}`,
									children: translate('common.action.moreInformation'),
								},
							}}
							secondaryCta={
								pageData.eventShowcase.ticketingUrl
									? {
											link: {
												href: pageData.eventShowcase.ticketingUrl,
												children: translate('common.action.buyTickets'),
												icon: <TicketIcon className="ml-2 inline-block h-5 align-text-top" />,
											},
									  }
									: undefined
							}
						/>
					)}
					<div className="bg-sea-green-200 md:py-16">
						<ContentConstraint>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-8">
								{latestArticles.map((article) => (
									<ArticleExcerpt
										key={article.slug}
										slug={article.slug}
										title={article.title}
										description={article.excerpt}
										authorName={article.author?.fullName || 'Rheinklang Team'}
										authorImage={article.author?.image?.path || 'TODO PLACEHOLDER'}
										creationDate={article._created}
										category={article.category}
										image={article.image?.path || 'TODO FALLBACK'}
										readingTime={article.readingTime}
									/>
								))}
							</div>
							<ButtonGroup className="mt-8 lg:mt-16">
								<Button
									type="black"
									link={{
										href: StaticRoutes.BLOG,
										icon: <ArrowRightIcon className="inline ml-2 h-5 align-text-top" />,
										children: translate('common.action.toAllArticles'),
									}}
								/>
							</ButtonGroup>
						</ContentConstraint>
					</div>
					<div className="bg-sea-green-400 md:py-16">
						<ContentConstraint>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
								{nextEvents.map((event) => (
									<EventExcerpt
										key={event.slug}
										date={event.date}
										category={event.type || 'unknown'}
										location={event.location}
										description={event.excerpt}
										slug={event.slug}
										title={event.title}
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

HomePage.displayName = 'HomePage';

export default HomePage;
