import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getTeamMembersList } from '../../api/team';
import { ContentConstraint } from '../../components/ContentConstraint';
import { ContentHeader } from '../../components/ContentHeader';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ProfileTeaser } from '../../components/ProfileTeaser';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { useTranslation } from '../../hooks/useTranslation';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('http500');
	const contentProviderProps = await getContentProviderProps();
	const teamMembers = await getTeamMembersList();

	return {
		props: {
			contentProviderProps,
			teamMembers,
		},
	};
}

const AboutUsPersonsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	teamMembers,
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
					<ContentHeader title="Unser Team" text="Irgendeine beschreibung ..." />
					<div className="bg-sea-green-300 py-12">
						<ContentConstraint>
							<div className="mx-auto flex flex-row flex-wrap lg:flex-nowrap gap-12">
								<div className="lg:w-3/4 xl:w-8/12">
									<img
										className="rounded-2xl shadow-sm object-cover object-center"
										src="https://dummyimage.com/1920x1080/ffe054/ffffff"
										alt="Team"
									/>
								</div>
								<div className="flex-grow rounded-2xl bg-white p-8 shadow-sm">
									<p className="mr-auto">Von links nach rechts: ...</p>
								</div>
							</div>
						</ContentConstraint>
					</div>
					<div className="bg-black border-t border-b border-gray-800 py-12 lg:py-24">
						<ContentConstraint>
							<div className="flex flex-row flex-wrap sm:justify-evenly">
								{teamMembers
									.filter((member) => member.isActive === true)
									.map((member) => (
										<div
											className="basis-full mb-8 sm:basis-1/2 sm:p-4 lg:basis-1/3 lg:py-6 xl:basis-1/4 xl:py-8"
											key={member.fullName}
										>
											<ProfileTeaser
												key={member.fullName}
												name={member.fullName}
												role={member.role || ''}
												description={translate(`team.roles.${member.primaryActivityArea}`)}
												image={member.image?.path}
												isActive={member.isActive}
												starred={member.isFounder}
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
