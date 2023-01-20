import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

export interface BreadcrumbItemProps extends PropsWithChildren {
	href?: string;
	isCurrent?: boolean;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ href, children, isCurrent = false }) => {
	return (
		<li aria-current={isCurrent ? 'page' : undefined}>
			{(isCurrent || !href) && <span className="text-gray-300 cursor-default">{children}</span>}
			{!isCurrent && href && (
				<Link href={href} className="text-white hover:text-gray-200 transition-colors">
					{children}
				</Link>
			)}
		</li>
	);
};

BreadcrumbItem.displayName = 'BreadcrumbItem';
