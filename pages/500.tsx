import type { NextPage } from 'next';
import { ErrorPage } from '../components/ErrorPage';
import { PageLayout } from '../components/layouts/PageLayout';
import { ContentProvider, getContentProviderPropsGetterForPage } from '../components/utils/ContentProvider';

export async function getStaticProps() {
	const getContentProviderProps = getContentProviderPropsGetterForPage('http500');
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
			marketingBanner={contentProviderProps.marketingBanner}
			cta={contentProviderProps.headerConfiguration.cta}
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
