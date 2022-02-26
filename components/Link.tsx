import type { FC, PropsWithChildren, ReactElement } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

export type LinkProps = PropsWithChildren<{
	href: string;
	prefetch?: boolean;
	title?: string;
	className?: string;
	icon?: JSX.Element;
	iconPositon?: 'pre' | 'post';
}>;

export const Link: FC<LinkProps> = ({ children, href, className, icon, title, prefetch, iconPositon = 'post' }) => {
	const isInternal = href.startsWith('/') || !href.startsWith('http');

	if (isInternal) {
		<NextLink href={href} prefetch={prefetch === false ? false : true}>
			<a className={classNames('transition inline-flex items-center cursor-pointer', className)} title={title}>
				<span className="whitespace-nowrap">
					{icon && iconPositon === 'pre' && icon}
					{children}
					{icon && iconPositon === 'post' && icon}
				</span>
			</a>
		</NextLink>;
	}

	const utmParams = new URLSearchParams();
	utmParams.append('utm_source', 'rheinklang-website');
	utmParams.append('utm_medium', 'link');
	utmParams.append('utm_campaign', 'referal');

	return (
		<a
			className={classNames('transition inline-flex items-center cursor-pointer', className)}
			rel="noopener noreferrer"
			target="_blank"
			href={`${href}?${utmParams.toString()}`}
			title={title}
		>
			<span className="whitespace-nowrap">
				{icon && iconPositon === 'pre' && icon}
				{children}
				{icon && iconPositon === 'post' && icon}
			</span>
		</a>
	);
};

Link.displayName = 'Link';
