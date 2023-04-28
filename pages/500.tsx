import type { NextPage } from 'next';
import { ErrorPage } from '../components/ErrorPage';
import { PageLayout } from '../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../components/utils/ContentProvider';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('http500');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const Error500: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => (
	<ContentProvider {...contentProviderProps}>
		<PageLayout
			isDarkOnly
			marketingBanner={contentProviderProps.marketingBanner}
			cta={contentProviderProps.headerConfiguration.cta}
			festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
		>
			<ErrorPage
				isRetryable
				statusCode={500}
				title="Ups, da ist etwas schief gelaufen"
				message="Bitte versuche es später noch einmal oder wende dich direkt an unser Team."
			/>
		</PageLayout>
	</ContentProvider>
);

Error500.displayName = 'Error500';

export default Error500;
