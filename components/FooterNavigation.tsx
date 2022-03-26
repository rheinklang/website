import type { FC } from 'react';
import { Heading } from './Heading';
import { Link, LinkProps } from './Link';

export interface FooterNavigationProps {
	title: string;
	items: LinkProps[];
}

export const FooterNavigation: FC<FooterNavigationProps> = ({ title, items = [] }) => {
	return (
		<div className="w-fit">
			<Heading level="3" className="mb-4">
				{title}
			</Heading>
			<nav id="footer-navigation" aria-label="Footer">
				<ul>
					{items.map((item) => (
						<li key={item.href} className="mb-2">
							<Link isStandalone {...item} />
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

FooterNavigation.displayName = 'FooterNavigation';
