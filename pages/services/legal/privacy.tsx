import { NextPage } from 'next';
import { getPrivacyPageData } from '../../../api/privacy';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { ContentHeader } from '../../../components/ContentHeader';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { Richtext, richtextWithIdMarksXSSFilter } from '../../../components/Richtext';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { useHashScroller } from '../../../hooks/useHashScroller';
import { useTranslation } from '../../../hooks/useTranslation';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('privacy-data-protection');
	const contentProviderProps = await getContentProviderProps();
	const pageData = await getPrivacyPageData();

	return {
		props: {
			contentProviderProps,
			pageData,
		},
	};
}

const PrivacyPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	pageData,
}) => {
	const translate = useTranslation(contentProviderProps.translations);

	// we want to support hash links
	useHashScroller();

	return (
		<ContentProvider {...contentProviderProps}>
			<PageLayout
				isDarkOnly
				cta={contentProviderProps.headerConfiguration.cta}
				marketingBanner={contentProviderProps.marketingBanner}
			>
				<ContentHeader
					constraintClassName="lg:max-w-7xl"
					title={translate('navigation.privacy.title')}
					text={translate('navigation.privacy.text')}
				/>
				<div className="bg-gray-50">
					<ContentConstraint className="py-12 md:py-16 lg:py-20 lg:max-w-7xl">
						<Richtext as="article" filter={richtextWithIdMarksXSSFilter} content={pageData.content} />
					</ContentConstraint>
				</div>
			</PageLayout>
		</ContentProvider>
	);
};

PrivacyPage.displayName = 'PrivacyPage';

export default PrivacyPage;
