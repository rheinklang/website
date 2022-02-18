import type { FC } from 'react';
import { ArrowRightIcon, LightningBoltIcon } from '@heroicons/react/outline';
import { Button } from './Button';
import { MainNavigationItem, MainNavigationItemProps } from './MainNavigationItem';

// interface MainNavigationItemProps {
// 	title: string;
// 	link: string;
// }

// const MainNavigationItem: FC<MainNavigationItemProps> = () => (

// )

export interface MainNavigationProps {
	items?: MainNavigationItemProps[];
}

const defaultItemsForTesting: MainNavigationItemProps[] = [
	{
		title: 'Events',
		href: '/events',
		expansion: () => <div>test</div>,
	},
	{
		title: 'Blog',
		href: '/blog',
	},
	{
		title: 'Über Uns',
		href: '/about-us',
		expansion: () => <div>test</div>,
	},
	{
		title: 'Kontakt',
		href: '/contact',
		expansion: () => <div>test</div>,
	},
];

export const MainNavigation: FC<MainNavigationProps> = ({ items = defaultItemsForTesting }) => {
	return (
		<nav role="main">
			<ul className="flex">
				{items.map((item) => (
					<li key={item.href} className="mr-4">
						<MainNavigationItem {...item} />
					</li>
				))}
				<li>
					{/* This CTA should be dynamically controllable via CMS eg. "Festival Tickets" or "Rhema Tickets" */}
					<Button icon={<ArrowRightIcon className="inline-block align-text-top h-5 mr-2" />}>
						Festival Tickets
					</Button>
				</li>
			</ul>
		</nav>
	);
};

MainNavigation.displayName = 'MainNavigation';
