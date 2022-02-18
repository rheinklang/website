import type { FC, PropsWithChildren, ReactElement } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

export type LinkProps = PropsWithChildren<{
	href: string;
	className?: string;
	icon?: JSX.Element;
	iconPositon?: 'pre' | 'post';
}>;

export const Link: FC<LinkProps> = ({ children, href, className, icon, iconPositon = 'post' }) => (
	<NextLink href={href}>
		<a className={classNames('transition flex items-center', className)}>
			<span className="whitespace-nowrap">
				{icon && iconPositon === 'pre' && icon}
				{children}
				{icon && iconPositon === 'post' && icon}
			</span>
		</a>
	</NextLink>
);

Link.displayName = 'Link';
