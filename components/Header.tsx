import Link from 'next/link';
import { FC } from 'react';
import { ContentContainer } from './ContentContainer';
import { MainNavigation } from './MainNavigation';

export const Header: FC = () => {
	return (
		<header className="z-30 w-full py-7 px-4 bg-black text-white sm:px-4">
			<ContentContainer tag="nav" isFlexContainer>
				<Link href="/">
					<a title="Homepage" className="flex items-center font-corporate text-3xl h-12 pt-2">
						RHEINKLANG
					</a>
				</Link>
				<MainNavigation />
			</ContentContainer>
		</header>
	);
};

Header.displayName = 'Header';
