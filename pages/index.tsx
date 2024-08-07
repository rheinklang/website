import { ArrowRightIcon, TicketIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
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
import { Heading } from '../components/Heading';
import { Hero } from '../components/Hero';
import { PageLayout } from '../components/layouts/PageLayout';
import { RecommendedContentHero } from '../components/RecommendedContentHero';
import { getContextualContentProviderFetcher, ContentProvider } from '../components/utils/ContentProvider';
import { ErrorBoundary } from '../components/utils/ErrorBoundary';
import { useTranslation } from '../hooks/useTranslation';
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
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					{pageData.heroTitle && pageData.heroText && (
						<Hero
							// hasFollowingContent={!!pageData.eventShowcase}
							title={pageData.heroTitle}
							text={[pageData.heroText]}
							image={pageData.heroImage?.path}
							primaryCta={
								pageData.heroPrimaryCta && pageData.heroPrimaryCta.link && pageData.heroPrimaryCta.title
									? {
											link: {
												href: `${pageData.heroPrimaryCta!.link}`,
												children: <>{`${pageData.heroPrimaryCta.title}`}</>,
											},
									  }
									: undefined
							}
							secondaryCta={
								pageData.heroSecondaryCta &&
								pageData.heroSecondaryCta.link &&
								pageData.heroSecondaryCta.title
									? {
											link: {
												href: `${pageData.heroSecondaryCta.link}`,
												children: <>{`${pageData.heroSecondaryCta.title}`}</>,
											},
									  }
									: undefined
							}
						/>
					)}
					{pageData.eventShowcase && (
						<div className="py-8 bg-sea-green-300 before:skew-y-3">
							<RecommendedContentHero
								isEmbeddedInSameColor
								label={translate('common.heading.nextEvent')}
								title={pageData.eventShowcase.title}
								text={[pageData.eventShowcase.excerpt]}
								date={pageData.eventShowcase.date}
								link={`${StaticRoutes.EVENT_DETAIL}/${pageData.eventShowcase.slug}`}
								image={pageData.eventShowcase.image}
							/>
						</div>
					)}
					<div data-nosnippet className="bg-gray-100 md:py-16">
						<ContentConstraint>
							<Heading level="2" className="text-center mb-12">
								{translate('common.heading.latestArticles')}
							</Heading>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-8">
								{latestArticles.map((article, index) => (
									<ArticleExcerpt
										key={index + article._created + article.slug}
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
										href: `${StaticRoutes.BLOG}/page/1`,
										icon: <ArrowRightIcon className="inline ml-2 h-5 align-text-top" />,
										children: translate('common.action.toAllArticles'),
									}}
								/>
							</ButtonGroup>
						</ContentConstraint>
					</div>
					{nextEvents.length > 0 && (
						<div className="bg-sea-green-400 md:py-16">
							<ContentConstraint>
								<div
									className={classNames([
										`grid grid-cols-1 gap-12 md:gap-16`,
										// workaround for tailwinds' CSS purging with dynamic class names
										{
											'lg:grid-cols-3': nextEvents.length >= 3,
											'lg:grid-cols-2': nextEvents.length === 2,
										},
									])}
								>
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
					)}
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

HomePage.displayName = 'HomePage';

export default HomePage;
