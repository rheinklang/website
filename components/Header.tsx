import Link from 'next/link';
import type { FC } from 'react';
import { ContentConstraint } from './ContentConstraint';
import { MainNavigation } from './MainNavigation';
import type { ContentProviderProps } from './utils/ContentProvider';

export interface HeaderProps {
	cta: ContentProviderProps['headerConfiguration']['cta'];
}

export const Header: FC<HeaderProps> = ({ cta }) => (
	<header className="relative z-30 w-full bg-black text-white h-28 sm:px-4">
		<ContentConstraint useCustomYSpace className="flex justify-between h-28">
			<Link href="/">
				<a title="Homepage" className="flex items-center font-corporate text-3xl h-12 pt-2">
					RHEINKLANG
				</a>
			</Link>
			<MainNavigation cta={cta} />
		</ContentConstraint>
	</header>
);

Header.displayName = 'Header';
