import { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from '../Footer';
import { Header, HeaderProps } from '../Header';
import { MarketingBanner } from '../MarketingBanner';
import { Matomo } from '../utils/Matomo';
import type { ContentProviderProps } from '../utils/ContentProvider';
import { useTranslation } from '../../hooks/useTranslation';
import type { ConsentProps } from '../Consent';

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
	const translate = useTranslation();

	return (
		<>
			{marketingBanner && (
				<MarketingBanner text={marketingBanner.message} id={marketingBanner.id} link={marketingBanner.link} />
			)}
			<Header cta={cta} />
			<div>{children}</div>
			<Footer />
			<Consent variant={isDarkOnly ? 'light' : 'dark'} />
			<Matomo />
		</>
	);
};

PageLayout.displayName = 'PageLayout';
