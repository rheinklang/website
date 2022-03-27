import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getAvailableEventsForSubmission } from '../../../api/forms';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { GuestAppearanceForm } from '../../../components/forms/GuestAppearanceForm';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { useTranslation } from '../../../hooks/useTranslation';

export async function getStaticProps() {
	const availableEvents = await getAvailableEventsForSubmission();
	const getContentProviderProps = getContextualContentProviderFetcher('form', {
		title: 'translate:forms.guestAppearanceSubmission.title',
		text: 'translate:forms.guestAppearanceSubmission.text',
	});
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			availableEvents,
			contentProviderProps,
		},
	};
}

const ContactGuestAppearancePage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	availableEvents,
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
						title={translate('forms.guestAppearanceSubmission.title')}
						text={translate('forms.guestAppearanceSubmission.text')}
						constraintClassName="lg:max-w-4xl"
					/>
					<ContentConstraint className="lg:max-w-4xl">
						<GuestAppearanceForm options={availableEvents} />
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactGuestAppearancePage.displayName = 'ContactGuestAppearancePage';

export default ContactGuestAppearancePage;
