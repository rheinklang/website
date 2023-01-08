import { AriaAttributes, FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';
import { tagManagerPush } from '../utils/matomo';
import { DEFAULT_EXTERNAL_CAMPAIGNER_PARAMS } from '../utils/campaigner';

export type LinkProps = PropsWithChildren<{
	href: string;
	title?: string;
	className?: string;
	icon?: JSX.Element;
	iconPositon?: 'pre' | 'post';
	tabIndex?: number;
	action?: string;
	isFlex?: boolean;
	isUnstyled?: boolean;
	isPureContent?: boolean;
	isStandalone?: boolean;
	onClick?: () => void;
}> &
	Partial<AriaAttributes>;

export interface RawLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	href: string;
	className?: string;
	title?: string;
	action?: string;
	utmParams?: URLSearchParams;
}

const trackExternalLinkLeap = (url: string, title: string) => {
	tagManagerPush({
		url,
		title,
		event: 'externalLinkLeap',
		source: window.location.href,
	});
};

export const RawLink: FC<RawLinkProps> = ({
	href,
	title,
	className,
	children,
	action,
	utmParams = DEFAULT_EXTERNAL_CAMPAIGNER_PARAMS,
	...nativeHtmlAttributes
}) => {
	const isInternal = useMemo(() => href.startsWith('/') || href.startsWith('http') === false, [href]);

	if (isInternal) {
		return (
			<NextLink legacyBehavior href={href}>
				<a className={className} title={title} {...nativeHtmlAttributes}>
					{children}
				</a>
			</NextLink>
		);
	}

	return (
		<a
			{...nativeHtmlAttributes}
			data-action={action}
			rel="noopener noreferrer"
			target="_blank"
			href={`${href}?${utmParams.toString()}`}
			title={title}
			className={className}
			onClick={() => {
				trackExternalLinkLeap(href, `${children}`);
			}}
		>
			{children}
		</a>
	);
};

RawLink.displayName = 'RawLink';

export const Link: FC<LinkProps> = ({
	children,
	href,
	className,
	icon,
	title,
	tabIndex,
	action,
	iconPositon = 'post',
	isFlex = true,
	isUnstyled = false,
	isPureContent = false,
	isStandalone = false,
	...ariaAttributes
}) => {
	const isInternal = useMemo(() => href.startsWith('/') || href.startsWith('http') === false, [href]);

	if (isInternal) {
		return (
			<NextLink legacyBehavior href={href}>
				<a
					className={classNames(
						{
							'transition group cursor-pointer': isUnstyled === false,
							'inline-flex items-center': isFlex,
							'transition-colors hover:text-sea-green-300': isStandalone,
						},
						className
					)}
					title={title}
					tabIndex={tabIndex}
					{...ariaAttributes}
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
				{
					'transition group inline-flex items-center cursor-pointer': isUnstyled === false,
					'transition-colors hover:text-sea-green-300': isStandalone,
				},
				className
			)}
			data-action={action}
			rel="noopener noreferrer"
			target="_blank"
			href={`${href}?${utmParams.toString()}`}
			title={title}
			{...ariaAttributes}
			onClick={() => {
				trackExternalLinkLeap(href, `${children}`);
			}}
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
