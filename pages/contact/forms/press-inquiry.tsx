import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { PressInquiryForm } from '../../../components/forms/PressInquiryForm';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('http500');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const ContactPressInquiryPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<ContentHeader title="Presse-Anfrage" constraintClassName="lg:max-w-4xl" />
					<ContentConstraint className="lg:max-w-4xl">
						<PressInquiryForm />
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactPressInquiryPage.displayName = 'ContactPressInquiryPage';

export default ContactPressInquiryPage;