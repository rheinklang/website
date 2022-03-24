import Link from 'next/link';
import type { FC } from 'react';
import { StaticRoutes } from '../utils/routes';
import { ContentConstraint } from './ContentConstraint';
import { RawLink } from './Link';
import { MainNavigation } from './MainNavigation';
import { CorporateLogo } from './static/CorporateLogo';
import type { ContentProviderProps } from './utils/ContentProvider';

export interface HeaderProps {
	cta: ContentProviderProps['headerConfiguration']['cta'];
}

export const Header: FC<HeaderProps> = ({ cta }) => (
	<header className="relative z-30 w-full bg-black text-white h-28 sm:px-4">
		<ContentConstraint useCustomYSpace className="flex justify-between h-28">
			<RawLink href={StaticRoutes.HOME} className="flex items-center text-3xl md:text-4xl h-12">
				<span className="mt-2 font-black italic">RHEINKLANG</span>
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
			<MainNavigation cta={cta} />
		</ContentConstraint>
	</header>
);

Header.displayName = 'Header';
