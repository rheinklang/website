import Link from 'next/link';
import { FC } from 'react';
import { ContentConstraint } from './ContentConstraint';
import { MainNavigation } from './MainNavigation';

export const Header: FC = () => {
	return (
		<header className="relative z-30 w-full bg-black text-white h-28 sm:px-4">
			<ContentConstraint tag="nav" className="flex justify-between">
				<Link href="/">
					<a title="Homepage" className="flex items-center font-corporate text-3xl h-12 pt-2">
						RHEINKLANG
					</a>
				</Link>
				<MainNavigation />
			</ContentConstraint>
		</header>
	);
};

Header.displayName = 'Header';
