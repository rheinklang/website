import { FC, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { MainNavigationItemExpansion, MainNavigationItemExpansionProps } from './MainNavigationItemExpansion';
import { Link } from './Link';

export interface MainNavigationItemProps {
	href: string;
	title: string | JSX.Element;
	expansion?: MainNavigationItemExpansionProps;
	handleClose?: () => void;
}

export const MainNavigationItem: FC<MainNavigationItemProps> = ({ href, title, expansion, handleClose }) => {
	const router = useRouter();
	const isActive = useMemo(() => router.asPath !== '/' && router.asPath.startsWith(href), [router.asPath, href]);
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="relative" onMouseOver={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
			<Link
				isPureContent
				href={href}
				aria-haspopup={!!expansion}
				aria-expanded={isExpanded}
				className={classNames(
					'transition flex items-center h-12 w-full px-6 rounded-lg text-lg hover:bg-white hover:text-black lg:w-auto',
					'outline-none ring-white focus:ring-2',
					{
						'bg-white text-black': isActive,
						'cursor-default': isActive,
					}
				)}
			>
				{title}
				{expansion && !isExpanded && <ChevronDownIcon className="invisible lg:visible ml-1 h-6" />}
				{expansion && isExpanded && <ChevronUpIcon className="invisible lg:visible ml-1 h-6" />}
			</Link>
			<div>
				<MainNavigationItemExpansion {...expansion} handleClose={handleClose} isVisible={isExpanded} />
			</div>
		</div>
	);
};

MainNavigationItem.displayName = 'MainNavigationItem';
