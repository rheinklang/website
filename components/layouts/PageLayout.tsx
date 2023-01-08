import { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Matomo } from '../utils/Matomo';
import type { ContentProviderProps } from '../utils/ContentProvider';
import type { ConsentProps } from '../Consent';
import { ScrollTop } from '../ScrollTop';

// TODO: Refactor to React.lazy once React 18 stable is released
const Consent = dynamic<ConsentProps>(
	() => import(/* webpackChunkName: "consent-component" */ '../Consent').then((m) => m.Consent),
	{
		loading: () => null,
	}
);

interface PageLayoutProps extends PropsWithChildren {
	marketingBanner: ContentProviderProps['marketingBanner'];
	cta: ContentProviderProps['headerConfiguration']['cta'];
	isDarkOnly?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({ children, marketingBanner, cta, isDarkOnly = false }) => {
	return (
		<>
			<Header marketingBanner={marketingBanner} cta={cta} />
			<div>{children}</div>
			<Footer />
			<ScrollTop />
			<Consent variant={isDarkOnly ? 'light' : 'dark'} />
			<Matomo />
		</>
	);
};

PageLayout.displayName = 'PageLayout';
