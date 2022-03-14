import { ArrowRightIcon, TicketIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPaginatedArticles } from '../api/articles';
import { getUpcomingEvents } from '../api/events';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { ContentConstraint } from '../components/ContentConstraint';
import { EventExcerpt } from '../components/EventExcerpt';
import { Hero } from '../components/Hero';
import { PageLayout } from '../components/layouts/PageLayout';
import { getContextualContentProviderFetcher, ContentProvider } from '../components/utils/ContentProvider';
import { ErrorBoundary } from '../components/utils/ErrorBoundary';
import { parseCockpitDate } from '../utils/date';
import { StaticRoutes } from '../utils/routes';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('home');
	const contentProviderProps = await getContentProviderProps();
	const latestArticles = await getPaginatedArticles(0, 3);
	const nextEvents = await getUpcomingEvents(3);

	return {
		props: {
			contentProviderProps,
			latestArticles,
			nextEvents,
		},
	};
}

const HomePage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	latestArticles,
	nextEvents,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<Hero
						title="Rheinklang Festival 2022"
						text={[
							'Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.',
						]}
						primaryCta={{
							link: {
								href: '/',
								children: 'Jetzt Tickets Kaufen',
								icon: <TicketIcon className="ml-2 inline-block h-5 align-text-top" />,
							},
						}}
						secondaryCta={{
							link: {
								href: '/',
								children: 'Mehr Informationen',
							},
						}}
					/>
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
										children: 'Alle Artikel',
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
										date={parseCockpitDate(event.date)}
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
