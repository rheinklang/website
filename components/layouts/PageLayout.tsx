import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MarketingBanner } from '../MarketingBanner';
import { Matomo } from '../utils/Matomo';
import type { ContentProviderProps } from '../utils/ContentProvider';
import type { MainNavigationItemProps } from '../MainNavigationItem';
import {
	BriefcaseIcon,
	FlagIcon,
	InboxIcon,
	SunIcon,
	SupportIcon,
	UserGroupIcon,
	UsersIcon,
} from '@heroicons/react/outline';
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
}

export const PageLayout: FC<PageLayoutProps> = ({ children, marketingBanner }) => {
	const translate = useTranslation();

	return (
		<>
			{marketingBanner && (
				<MarketingBanner
					text={marketingBanner.marketingBannerSingleton.message}
					id={marketingBanner.marketingBannerSingleton.id}
					link={marketingBanner.marketingBannerSingleton.link}
				/>
			)}
			<Header />
			<div>{children}</div>
			<Footer />
			<Consent />
			<Matomo />
		</>
	);
};

PageLayout.displayName = 'PageLayout';
