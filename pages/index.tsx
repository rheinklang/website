import { TicketIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { ArticleExcerpt } from '../components/ArticleExcerpt';
import { ArticleExcerptGrid } from '../components/ArticleExcerptGrid';
import { ContentContainer } from '../components/ContentContainer';
import { EventExcerpt } from '../components/EventExcerpt';
import { EventExcerptGrid } from '../components/EventExcerptGrid';
import { Hero } from '../components/Hero';

const HomePage: NextPage = () => {
	return (
		<div>
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
			<ArticleExcerptGrid size="medium">
				<ArticleExcerpt />
				<ArticleExcerpt />
				<ArticleExcerpt />
			</ArticleExcerptGrid>
			<EventExcerptGrid>
				<EventExcerpt />
				<EventExcerpt />
				<EventExcerpt />
			</EventExcerptGrid>
		</div>
	);
};

HomePage.displayName = 'HomePage';

export default HomePage;
