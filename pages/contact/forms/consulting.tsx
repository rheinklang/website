import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { ConsultingForm } from '../../../components/forms/ConsultingForm';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { useTranslation } from '../../../hooks/useTranslation';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('form', {
		title: 'translate:forms.consulting.title',
		text: 'translate:forms.consulting.text',
	});
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
	const translate = useTranslation(contentProviderProps.translations);
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					<ContentHeader
						constraintClassName="lg:max-w-4xl"
						title={translate('forms.consulting.title')}
						text={translate('forms.consulting.text')}
					/>
					<ContentConstraint className="lg:max-w-4xl">
						<ConsultingForm />
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactPressInquiryPage.displayName = 'ContactPressInquiryPage';

export default ContactPressInquiryPage;
