import { NextPage } from 'next';
import Head from 'next/head';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { TwitchStream } from '../../components/TwitchStream';
import { Button } from '../../components/Button';
import { ContentConstraint } from '../../components/ContentConstraint';
import { Heading } from '../../components/Heading';
import { useApolloClient } from '@apollo/client';
import { Settings } from '../../components/utils/Settings';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('settings');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const SettingsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => {
	return (
		<ContentProvider {...contentProviderProps}>
			<PageLayout
				isDarkOnly
				cta={contentProviderProps.headerConfiguration.cta}
				marketingBanner={contentProviderProps.marketingBanner}
			>
				<Settings />
			</PageLayout>
		</ContentProvider>
	);
};

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
