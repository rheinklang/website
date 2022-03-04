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

const Error403: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => (
	<ContentProvider {...contentProviderProps}>
		<PageLayout
			isDarkOnly
			marketingBanner={contentProviderProps.marketingBanner}
			cta={contentProviderProps.headerConfiguration.cta}
		>
			<ErrorPage
				statusCode={404}
				title="Oh, darauf hast du wohl kein Zugriff"
				message="Bist du dir sicher dass du autorisiert bist die Seite aufzurufen?"
			/>
		</PageLayout>
	</ContentProvider>
);

Error403.displayName = 'Error404';

export default Error403;
