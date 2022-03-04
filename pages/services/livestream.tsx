import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
import { getTwitchPlayerUrl } from '../../utils/twitch';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { TwitchStream } from '../../components/TwitchStream';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('livestream');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const LiveStreamPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => {
	return (
		<ContentProvider {...contentProviderProps}>
			<Head>
				<link rel="preconnect" href="https://player.twitch.tv" />
				<link rel="dns-prefetch" href="https://player.twitch.tv" />
			</Head>
			<PageLayout
				isDarkOnly
				cta={contentProviderProps.headerConfiguration.cta}
				marketingBanner={contentProviderProps.marketingBanner}
			>
				<TwitchStream />
			</PageLayout>
		</ContentProvider>
	);
};

LiveStreamPage.displayName = 'LiveStreamPage';

export default LiveStreamPage;
