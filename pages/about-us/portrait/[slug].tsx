import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getTeamMemberPortrait, getTeamMemberPortraitSlugs } from '../../../api/team';
import { MemberPortraitPageComponent } from '../../../components/pages/MemberPortrait';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const slug = `${params?.slug}`;
	const pageData = await getTeamMemberPortrait(slug);

	// Main provider information
	const getContentProviderProps = getContextualContentProviderFetcher('memberPortrait', {
		name: pageData.fullName,
		bio: `${pageData.bio || ''}`,
	});
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			pageData,
			contentProviderProps,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getTeamMemberPortraitSlugs();

	return {
		fallback: false,
		paths: slugs.map((slug) => ({
			params: { slug },
		})),
	};
};

const TeamMemberPortraitPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	pageData,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<MemberPortraitPageComponent
						image={pageData.image}
						links={pageData.links}
						name={pageData.fullName}
						bio={pageData.bio}
						entryDate={pageData.entryDate}
						isFounder={pageData.isFounder}
						favoriteDrink={pageData.favoriteDrink}
						favoriteGenre={pageData.favoriteGenre}
						primaryActivityArea={pageData.primaryActivityArea}
					/>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

TeamMemberPortraitPage.displayName = 'TeamMemberPortraitPage';

export default TeamMemberPortraitPage;
