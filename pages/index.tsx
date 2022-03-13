import { TicketIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPaginatedArticles } from '../api/articles';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { ContentConstraint } from '../components/ContentConstraint';
import { EventExcerpt } from '../components/EventExcerpt';
import { Hero } from '../components/Hero';
import { PageLayout } from '../components/layouts/PageLayout';
import { getContextualContentProviderFetcher, ContentProvider } from '../components/utils/ContentProvider';
import { ErrorBoundary } from '../components/utils/ErrorBoundary';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('home');
	const contentProviderProps = await getContentProviderProps();
	const latestArticles = await getPaginatedArticles(0, 3);

	return {
		props: {
			contentProviderProps,
			latestArticles,
		},
	};
}

const HomePage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	latestArticles,
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
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
								{latestArticles.map((article) => (
									<ArticleExcerpt
										key={article.slug}
										title={article.title}
										description={article.excerpt}
										authorName={article.author?.fullName || 'Rheinklang Team'}
										authorImage={article.author?.image?.path || 'TODO PLACEHOLDER'}
										authorRole={article.author?.role}
										category={article.category}
										image={article.image?.path || 'TODO FALLBACK'}
										readingTime={article.readingTime}
									/>
								))}
							</div>
						</ContentConstraint>
					</div>
					<div className="bg-sea-green-400 md:py-16">
						<ContentConstraint>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
								<EventExcerpt />
								<EventExcerpt />
								<EventExcerpt />
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
