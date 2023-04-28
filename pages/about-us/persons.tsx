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
	const teamMembers = await getTeamMembersList();
	const pageData = await getPortraitPage();

	const getContentProviderProps = getContextualContentProviderFetcher('portrait');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
			pageData,
			teamMembers,
		},
	};
}

const AboutUsPersonsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	teamMembers,
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
					<ContentHeader title={pageData.title} text={pageData.description || undefined} />
					{/* TODO: Add back once we have the group image! */}
					{/* <div className="bg-sea-green-300 py-12">
						<ContentConstraint>
							<div className="mx-auto flex flex-row flex-wrap lg:flex-nowrap gap-12">
								<div className="lg:w-3/4 xl:w-8/12">
									<Image
										isObjectFitCover
										src={pageData.teamImage.path}
										alt={pageData.teamImage.title || 'Team Portrait'}
										className="rounded-2xl shadow-2xl"
									/>
								</div>
								<div className="flex-grow rounded-2xl shadow-2xl bg-white p-8">
									<p className="mr-auto">{pageData.teamImageDescription}</p>
								</div>
							</div>
						</ContentConstraint>
					</div> */}
					<div className="py-12 lg:py-24">
						<ContentConstraint>
							<div className="flex flex-row flex-wrap sm:justify-evenly">
								{teamMembers
									.filter((member) => member.isActive === true)
									.map((member) => (
										<div
											className="basis-full mb-14 lg:mb-8 sm:p-4 lg:basis-1/2 lg:py-6 xl:basis-1/2 xl:py-8"
											key={member.fullName}
										>
											<PersonTeaser
												key={member.fullName}
												name={member.fullName}
												role={member.role || ''}
												slug={member.slug}
												description={translate(`team.roles.${member.primaryActivityArea}`)}
												image={member.image!.path}
												isActive={member.isActive}
												isFounder={member.isFounder}
											/>
										</div>
									))}
							</div>
						</ContentConstraint>
					</div>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

AboutUsPersonsPage.displayName = 'EventsPage';

export default AboutUsPersonsPage;
