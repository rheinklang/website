import { BriefcaseIcon, InboxIcon, MusicNoteIcon, NewspaperIcon, SupportIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContentConstraint } from '../../components/ContentConstraint';
import { ContentHeader } from '../../components/ContentHeader';
import { Feature } from '../../components/Feature';
import { SupportForm } from '../../components/forms/SupportForm';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { useTranslation } from '../../hooks/useTranslation';
import { StaticRoutes } from '../../utils/routes';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('http500');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
		},
	};
}

const ContactLandingPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
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
					<ContentConstraint className="lg:max-w-4xl lg:py-24">
						<div className="text-gray-600 body-font flex flex-wrap md:flex-row ">
							<Feature
								title={translate('forms.eventBooking.title')}
								text={translate('forms.eventBooking.text')}
								href={StaticRoutes.EVENT_INQUIRY}
								icon={InboxIcon}
							/>
							<Feature
								title={translate('forms.guestAppearanceSubmission.title')}
								text={translate('forms.guestAppearanceSubmission.text')}
								href={StaticRoutes.FESTIVAL_GUEST_APPEARANCE_INQUIRY}
								icon={MusicNoteIcon}
							/>
							<Feature
								title={translate('forms.consulting.title')}
								text={translate('forms.consulting.text')}
								href={StaticRoutes.CONSULTING_INQUIRY}
								icon={BriefcaseIcon}
							/>
							<Feature
								title={translate('forms.pressInquiry.title')}
								text={translate('forms.pressInquiry.text')}
								href={StaticRoutes.PRESS_INQUIRY}
								icon={NewspaperIcon}
							/>
							<Feature
								title={translate('forms.support.title')}
								text={translate('forms.support.text')}
								href={StaticRoutes.SUPPORT_INQUIRY}
								icon={SupportIcon}
							/>
						</div>
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ContactLandingPage.displayName = 'ContactLandingPage';

export default ContactLandingPage;
