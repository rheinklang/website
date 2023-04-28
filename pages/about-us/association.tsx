import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getTeamMembersList } from '../../api/team';
import { getPortraitPage } from '../../api/pages';
import { ContentConstraint } from '../../components/ContentConstraint';
import { ContentHeader } from '../../components/ContentHeader';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ProfileTeaser } from '../../components/ProfileTeaser';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { useTranslation } from '../../hooks/useTranslation';
import { Image } from '../../components/Image';
import { PersonTeaser } from '../../components/PersonTeaser';

export async function getStaticProps() {
	const pageData = await getPortraitPage();

	const getContentProviderProps = getContextualContentProviderFetcher('association');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
			pageData,
		},
	};
}

const AssociationPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	pageData,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					<ContentHeader title="Der Verein" text="Wissenswertes rund um den Verein Rheinklang" />
					<div className="py-12 lg:py-24">
						<ContentConstraint>
							<div className="flex flex-row flex-wrap sm:justify-evenly"></div>
						</ContentConstraint>
					</div>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

AssociationPage.displayName = 'AssociationPage';

export default AssociationPage;
