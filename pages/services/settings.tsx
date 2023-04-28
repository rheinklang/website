import { NextPage } from 'next';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
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
				festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
			>
				<Settings />
			</PageLayout>
		</ContentProvider>
	);
};

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
