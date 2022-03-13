import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { EventBookingForm } from '../../../components/forms/EventBookingForm';
import { PressInquiryForm } from '../../../components/forms/PressInquiryForm';
import { SupportForm } from '../../../components/forms/SupportForm';
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

const ContactSupportPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
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
					<ContentHeader
						title="Support Anfrage"
						text="Sie brauchen Hilfe? Wir sind für Sie da."
						constraintClassName="lg:max-w-4xl"
					/>
					<ContentConstraint className="lg:max-w-4xl">
						<SupportForm />
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactSupportPage.displayName = 'ContactSupportPage';

export default ContactSupportPage;
