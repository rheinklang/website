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

const Error404: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({ contentProviderProps }) => (
	<ContentProvider {...contentProviderProps}>
		<PageLayout
			isDarkOnly
			marketingBanner={contentProviderProps.marketingBanner}
			cta={contentProviderProps.headerConfiguration.cta}
		>
			<ErrorPage
				statusCode={404}
				title="Ups, diese Seite wurde nicht gefunden"
				message="Bist du dir sicher dass eine Seite unter dieser URL existiert?"
			/>
		</PageLayout>
	</ContentProvider>
);

Error404.displayName = 'Error404';

export default Error404;
