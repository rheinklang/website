import { FC, ReactElement, ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/outline';

export interface MainNavigationItemProps {
	href: string;
	title: string | JSX.Element;
	expansion?: ReactNode;
}

export const MainNavigationItem: FC<MainNavigationItemProps> = ({ href, title, expansion }) => {
	const router = useRouter();
	const isActive = useMemo(() => router.pathname === href, [router.pathname, href]);

	return (
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
				{expansion && <ChevronDownIcon className="ml-1 h-6" />}
			</a>
		</Link>
	);
};

MainNavigationItem.displayName = 'MainNavigationItem';
