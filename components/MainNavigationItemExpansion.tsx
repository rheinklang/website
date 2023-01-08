import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';

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
	handleClose?: () => void;
}

export const MainNavigationItemExpansion: FC<MainNavigationItemExpansionProps> = ({
	className,
	isVisible = false,
	items = [],
	handleClose,
}) => {
	const router = useRouter();

	if (items.length === 0) {
		return null;
	}

	return (
		<div className="lg:pt-7 overflow-hidden">
			<ul
				className={classNames(
					'transition-all ease-in-out overflow-hidden py-2 shadow-md text-white',
					'lg:absolute lg:rounded-lg lg:opacity-0 lg:max-h-0 lg:shadow-md lg:bg-white lg:text-black',
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
								<Link legacyBehavior href={href}>
									<a
										tabIndex={isVisible ? 0 : -1}
										className={classNames(
											'transition-colors flex align-center whitespace-nowrap py-4 px-8 align-center',
											'lg:text-black lg:hover:text-sea-green-400',
											{
												'text-gray-100': router.asPath !== href,
												'text-sea-green-400': router.asPath === href,
											}
										)}
										onClick={() => handleClose && handleClose()}
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
