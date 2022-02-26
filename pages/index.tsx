import { TicketIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { ContentConstraint } from '../components/ContentConstraint';
import { EventExcerpt } from '../components/EventExcerpt';
import { Hero } from '../components/Hero';
import { PageLayout } from '../components/layouts/PageLayout';
import {
	getContentProviderPropsGetterForPage,
	ContentProvider,
	ContentProviderProps,
} from '../components/utils/ContentProvider';

export async function getStaticProps() {
	const getContentProviderProps = getContentProviderPropsGetterForPage('home');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const HomePage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => {
	return (
		<ContentProvider {...contentProviderProps}>
			<PageLayout marketingBanner={contentProviderProps.marketingBanner}>
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
					<ContentConstraint tag="section">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
							<ArticleExcerpt />
							<ArticleExcerpt />
							<ArticleExcerpt />
						</div>
					</ContentConstraint>
				</div>
				<div className="bg-sea-green-400 md:py-16">
					<ContentConstraint tag="section">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
							<EventExcerpt />
							<EventExcerpt />
							<EventExcerpt />
						</div>
					</ContentConstraint>
				</div>
			</PageLayout>
		</ContentProvider>
	);
};

HomePage.displayName = 'HomePage';

export default HomePage;
