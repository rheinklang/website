import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { PageLayout } from '../../../components/layouts/PageLayout';
import {
	ContentProvider,
	ContentProviderStaticSEOVariables,
	getContextualContentProviderFetcher,
} from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getTeamMemberPortrait, getTeamMemberPortraitSlugs } from '../../../api/team';
import { MemberPortraitPageComponent } from '../../../components/pages/MemberPortrait';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem';
import { StaticRoutes } from '../../../utils/routes';
import { JsonLd } from '../../../components/utils/JsonLd';
import Head from 'next/head';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const slug = `${params?.slug}`;
	const pageData = await getTeamMemberPortrait(slug);

	// Main provider information
	const getContentProviderProps = getContextualContentProviderFetcher('memberPortrait', {
		name: pageData.fullName,
		bio: `${pageData.bio || ''}`,
		[ContentProviderStaticSEOVariables.OG_IMAGE]: pageData.image?.path,
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
	const [firstName, lastName] = pageData.fullName.split(' ');

	return (
		<ErrorBoundary route={router.asPath}>
			<Head>
				<meta key="og-type" property="og:type" content="profile" />
				<meta property="profile:first_name" content={firstName} />
				<meta property="profile:last_name" content={lastName} />
			</Head>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					<Breadcrumb>
						<BreadcrumbItem href={StaticRoutes.PORTRAIT}>Über uns</BreadcrumbItem>
						<BreadcrumbItem href={StaticRoutes.PORTRAIT}>Portrait</BreadcrumbItem>
						<BreadcrumbItem isCurrent>{pageData.fullName}</BreadcrumbItem>
					</Breadcrumb>
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
			<JsonLd
				schema={{
					'@type': 'Person',
					name: pageData.fullName,
				}}
			/>
		</ErrorBoundary>
	);
};

TeamMemberPortraitPage.displayName = 'TeamMemberPortraitPage';

export default TeamMemberPortraitPage;
