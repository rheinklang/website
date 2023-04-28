import { ArrowRightIcon, TicketIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPaginatedArticles } from '../api/articles';
import { sendContactSubmission, sendReportSubmission } from '../api/discord';
import { getUpcomingEvents } from '../api/events';
import { getFestivalsOverview } from '../api/festival';
import { getHomePage } from '../api/pages';
import { getCurrentActiveSponsors } from '../api/sponsors';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { ContentConstraint } from '../components/ContentConstraint';
import { EventExcerpt } from '../components/EventExcerpt';
import { Heading } from '../components/Heading';
import { Hero } from '../components/Hero';
import { Image } from '../components/Image';
import { PageLayout } from '../components/layouts/PageLayout';
import { RawLink } from '../components/Link';
import { RecommendedContentHero } from '../components/RecommendedContentHero';
import { getContextualContentProviderFetcher, ContentProvider } from '../components/utils/ContentProvider';
import { ErrorBoundary } from '../components/utils/ErrorBoundary';
import { useTranslation } from '../hooks/useTranslation';
import { StaticRoutes } from '../utils/routes';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('festivalsOverview');
	const contentProviderProps = await getContentProviderProps();

	const festivals = await getFestivalsOverview();

	return {
		props: {
			contentProviderProps,
			festivals,
		},
	};
}

const HomePage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	festivals,
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
					<ContentConstraint>
						<Heading level="1">Das Rheinklang Festival</Heading>
						{/* <p>Some text maybe?</p> */}
					</ContentConstraint>
					<ContentConstraint>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							{festivals.map((festival) => (
								<RawLink key={festival.year} href={`${StaticRoutes.FESTIVAL_YEAR}/${festival.year}`}>
									<div className="aspect-2 w-full h-64 md:h-72 lg:h-96 rounded-lg shadow-md relative">
										<div className="absolute left-0 right-0 top-0 bottom-0 bg-black/60 hover:bg-black/40 transition-colors items-center justify-center flex rounded-lg">
											<h2 className="text-7xl md:text-8xl lg:text-9xl font-sans font-black text-white z-10 absolute">
												{festival.year}
											</h2>
										</div>
										<Image
											isObjectFitCover
											src={festival.previewImage.path}
											alt={`Rheinklang Festival ${festival.year}`}
											className="rounded-lg"
										/>
									</div>
								</RawLink>
							))}
						</div>
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

HomePage.displayName = 'HomePage';

export default HomePage;
