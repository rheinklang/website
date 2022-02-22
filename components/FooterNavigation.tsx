import type { FC } from 'react';
import { Heading } from './Heading';
import { Link, LinkProps } from './Link';

export interface FooterNavigationProps {
	title: string;
	items: LinkProps[];
}

const defaultItemsForTesting: LinkProps[] = [{ href: '/', children: 'Home' }];

export const FooterNavigation: FC<FooterNavigationProps> = ({ title, items = defaultItemsForTesting }) => {
	return (
		<div className="w-full pb-8 md:w-auto md:pb-0">
			<Heading level="3" className="mb-4">
				{title}
			</Heading>
			<nav>
				<ul>
					{items.map((item) => (
						<li key={item.href} className="mb-2">
							<Link {...item} />
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
