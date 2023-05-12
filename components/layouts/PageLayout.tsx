import { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Matomo } from '../utils/Matomo';
import type { ContentProviderProps } from '../utils/ContentProvider';
import type { ConsentProps } from '../Consent';
import { ScrollTop } from '../ScrollTop';

const Consent = dynamic<ConsentProps>(() =>
	import(/* webpackChunkName: "consent-component" */ '../Consent').then((m) => m.Consent)
);

interface PageLayoutProps extends PropsWithChildren {
	marketingBanner: ContentProviderProps['marketingBanner'];
	cta: ContentProviderProps['headerConfiguration']['cta'];
	festivalRedirect: ContentProviderProps['headerConfiguration']['festivalRedirect'];
	className?: string;
	isDarkOnly?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
	children,
	className,
	marketingBanner,
	cta,
	festivalRedirect,
	isDarkOnly = false,
}) => {
	return (
		<>
			<Header marketingBanner={marketingBanner} cta={cta} festivalRedirect={festivalRedirect} />
			<div className={className}>{children}</div>
			<Footer isDarkOnly={isDarkOnly} />
			<ScrollTop />
			<Consent variant={isDarkOnly ? 'light' : 'dark'} />
			<Matomo />
		</>
	);
};

PageLayout.displayName = 'PageLayout';
