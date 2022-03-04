import classNames from 'classnames';
import Link from 'next/link';
import type { ComponentProps, FC } from 'react';
import { Heading } from './Heading';

export interface MainNavigationItemExpansionItemProps {
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
	title: string;
	description?: string;
	href: string;
}

export interface MainNavigationItemExpansionProps {
	className?: string;
	items?: MainNavigationItemExpansionItemProps[];
	isVisible?: boolean;
}

export const MainNavigationItemExpansion: FC<MainNavigationItemExpansionProps> = ({
	className,
	isVisible = false,
	items = [],
}) => {
	if (items.length === 0) {
		return null;
	}

	return (
		<div className="lg:pt-7 overflow-hidden">
			<ul
				className={classNames(
					'transition-all ease-in-out overflow-hidden bg-white py-2 text-black shadow-md ',
					'lg:absolute lg:rounded-lg lg:opacity-0 lg:max-h-0 shadow-2xl',
					className,
					{
						'lg:visible lg:opacity-100 lg:max-h-screen': isVisible,
					}
				)}
			>
				<div className="flex flex-col">
					{items.map(({ icon, href, title }) => {
						const Icon = icon;

						return (
							<li key={title}>
								<Link href={href}>
									<a
										tabIndex={isVisible ? 0 : -1}
										className={classNames(
											'transition-colors flex align-center whitespace-nowrap py-4 px-8 align-center hover:text-sea-green-400'
											// 'lg:border-t lg:border-gray-700'
										)}
									>
										{Icon && <Icon className="mr-4 h-5 align-text-top" />}
										{title}
									</a>
								</Link>
							</li>
						);
					})}
				</div>
			</ul>
		</div>
	);
};

MainNavigationItemExpansion.displayName = 'MainNavigationItemExpansion';
