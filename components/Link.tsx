import { FC, PropsWithChildren, ReactElement, useMemo } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

export type LinkProps = PropsWithChildren<{
	href: string;
	title?: string;
	className?: string;
	icon?: JSX.Element;
	iconPositon?: 'pre' | 'post';
	tabIndex?: number;
	action?: string;
	isPureContent?: boolean;
	isStandalone?: boolean;
}>;

export const Link: FC<LinkProps> = ({
	children,
	href,
	className,
	icon,
	title,
	tabIndex,
	action,
	iconPositon = 'post',
	isPureContent = false,
	isStandalone = false,
}) => {
	const isInternal = useMemo(() => href.startsWith('/') || href.startsWith('http') === false, [href]);

	if (isInternal) {
		return (
			<NextLink href={href}>
				<a
					className={classNames(
						'transition group inline-flex items-center cursor-pointer',
						{
							'transition-colors hover:text-sea-green-300': isStandalone,
						},
						className
					)}
					title={title}
					tabIndex={tabIndex}
				>
					{isPureContent && (
						<>
							{icon && iconPositon === 'pre' && icon}
							{children}
							{icon && iconPositon === 'post' && icon}
						</>
					)}

					{!isPureContent && (
						<span className="whitespace-nowrap">
							{icon && iconPositon === 'pre' && icon}
							{children}
							{icon && iconPositon === 'post' && icon}
						</span>
					)}
				</a>
			</NextLink>
		);
	}

	const utmParams = new URLSearchParams();
	utmParams.append('utm_source', 'rheinklang-website');
	utmParams.append('utm_medium', 'link');
	utmParams.append('utm_campaign', 'referral');

	return (
		<a
			className={classNames(
				'transition group inline-flex items-center cursor-pointer',
				{
					'transition-colors hover:text-sea-green-300': isStandalone,
				},
				className
			)}
			data-action={action}
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
