import { FC, ReactElement, ReactNode, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { MainNavigationItemExpansion, MainNavigationItemExpansionProps } from './MainNavigationItemExpansion';

export interface MainNavigationItemProps {
	href: string;
	title: string | JSX.Element;
	expansion?: MainNavigationItemExpansionProps;
}

export const MainNavigationItem: FC<MainNavigationItemProps> = ({ href, title, expansion }) => {
	const router = useRouter();
	const isActive = useMemo(() => router.pathname === href, [router.pathname, href]);
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="relative" onMouseOver={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
			<Link href={href}>
				<a
					className={classNames(
						'transition flex items-center h-12 px-6 rounded-lg text-lg hover:bg-white hover:text-black',
						{
							'bg-white text-black': isActive,
							'cursor-default': isActive,
						}
					)}
				>
					{title}
					{expansion && !isExpanded && <ChevronDownIcon className="invisible lg:visible ml-1 h-6" />}
					{expansion && isExpanded && <ChevronUpIcon className="invisible lg:visible ml-1 h-6" />}
				</a>
			</Link>
			{expansion && <MainNavigationItemExpansion {...expansion} isVisible={isExpanded} />}
		</div>
	);
};

MainNavigationItem.displayName = 'MainNavigationItem';
