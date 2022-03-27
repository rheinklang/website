import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { EventBookingForm } from '../../../components/forms/EventBookingForm';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { useTranslation } from '../../../hooks/useTranslation';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('form', {
		title: 'translate:forms.eventBooking.title',
		text: 'translate:forms.eventBooking.text',
	});
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const ContactEventBookingPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<ContentHeader
						title={translate('forms.eventBooking.title')}
						text={translate('forms.eventBooking.text')}
						constraintClassName="lg:max-w-4xl"
					/>
					<ContentConstraint className="lg:max-w-4xl">
						<EventBookingForm />
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactEventBookingPage.displayName = 'ContactEventBookingPage';

export default ContactEventBookingPage;
