import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from '../Footer';
import { Header, HeaderProps } from '../Header';
import { MarketingBanner } from '../MarketingBanner';
import { Matomo } from '../utils/Matomo';
import type { ContentProviderProps } from '../utils/ContentProvider';
import { useTranslation } from '../../hooks/useTranslation';

// TODO: Refactor to React.lazy once React 18 stable is released
const Consent = dynamic<{}>(
	() => import(/* webpackChunkName: "consent-component" */ '../Consent').then((m) => m.Consent),
	{
		loading: () => null,
	}
);

interface PageLayoutProps {
	marketingBanner: ContentProviderProps['marketingBanner'];
	cta: ContentProviderProps['headerConfiguration']['cta'];
}

export const PageLayout: FC<PageLayoutProps> = ({ children, marketingBanner, cta }) => {
	const translate = useTranslation();

	return (
		<>
			{marketingBanner && (
				<MarketingBanner text={marketingBanner.message} id={marketingBanner.id} link={marketingBanner.link} />
			)}
			<Header cta={cta} />
			<div>{children}</div>
			<Footer />
			<Consent />
			<Matomo />
		</>
	);
};

PageLayout.displayName = 'PageLayout';
