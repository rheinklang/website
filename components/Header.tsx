import classNames from 'classnames';
import type { FC } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { StaticRoutes } from '../utils/routes';
import { ContentConstraint } from './ContentConstraint';
import { RawLink } from './Link';
import { MainNavigation } from './MainNavigation';
import { MarketingBanner } from './MarketingBanner';
import type { ContentProviderProps } from './utils/ContentProvider';

export interface HeaderProps {
	marketingBanner: ContentProviderProps['marketingBanner'];
	cta: ContentProviderProps['headerConfiguration']['cta'];
	festivalRedirect: ContentProviderProps['headerConfiguration']['festivalRedirect'];
}

const UX_SCROLL_POSITION_OFFSET = 200;

export const Header: FC<HeaderProps> = ({ cta, marketingBanner, festivalRedirect }) => {
	const scrollPosition = useScrollPosition();

	return (
		<header
			className={classNames(
				'z-30 w-full sticky top-0 left-0 right-0 text-white backdrop-filter backdrop-blur-lg transition-all duration-500',
				{
					'top-0': !!marketingBanner,
					'bg-black/75 shadow-lg': scrollPosition > UX_SCROLL_POSITION_OFFSET,
					'bg-black': scrollPosition <= UX_SCROLL_POSITION_OFFSET,
				}
			)}
		>
			{marketingBanner && <MarketingBanner {...marketingBanner} />}
			<ContentConstraint useCustomYSpace className="relative flex justify-between h-24">
				<RawLink href={StaticRoutes.HOME} className="flex items-center text-3xl md:text-4xl h-12">
					<span className="mt-1 font-black italic">RHEINKLANG</span>
				</RawLink>
				{/* Corporate Idea: */}
				{/* <a title="Homepage" className="flex items-center text-4xl h-12">
					<div
						style={{ height: '1.875rem', width: '1.875rem', marginTop: '0.46rem', marginRight: '-0.1rem' }}
					>
						<CorporateLogo />
					</div>
					<span className="mt-2 font-black italic text-sea-green-400">HEINKLANG</span>
				</a> */}
				<MainNavigation cta={cta} festivalRedirect={festivalRedirect} />
			</ContentConstraint>
		</header>
	);
};

Header.displayName = 'Header';
