import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getLevelClusteredPartners } from '../../api/partners';
import { getTeamMembersList } from '../../api/team';
import { ContentConstraint } from '../../components/ContentConstraint';
import { ContentHeader } from '../../components/ContentHeader';
import { Heading } from '../../components/Heading';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ProfileTeaser } from '../../components/ProfileTeaser';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { PartnerLevel } from '../../graphql';
import { useTranslation } from '../../hooks/useTranslation';
import { CURRENT_YEAR } from '../../utils/date';
import { keys } from '../../utils/structs';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('http500');
	const contentProviderProps = await getContentProviderProps();
	const partners = await getLevelClusteredPartners();

	return {
		props: {
			contentProviderProps,
			partners,
		},
	};
}

const LEVEL_ORDER = [
	PartnerLevel.Diamond,
	PartnerLevel.Platinum,
	PartnerLevel.Gold,
	PartnerLevel.Silver,
	PartnerLevel.Bronze,
];

const AboutUsPersonsPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	partners,
}) => {
	const router = useRouter();
	const translate = useTranslation();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<ContentHeader title="Partner &amp; Sponsoren" text="Guter Text hier ..." />
					{/* border-t border-b border-gray-800 */}
					<section className="bg-gray-50 py-12 lg:py-12">
						{LEVEL_ORDER.map((level, levelIndex) =>
							partners[level].length === 0 ? null : (
								<div
									key={level + partners[level].length}
									className={classNames('border-gray-100 py-12', {
										'border-b': levelIndex !== LEVEL_ORDER.length - 1,
									})}
								>
									<ContentConstraint tag="article">
										<header>
											<Heading level="2" className="text-sea-green-700 text-center uppercase">
												{level}
											</Heading>
										</header>
										<div className="flex flex-row flex-wrap justify-evenly">
											{partners[level].map((partner) => (
												<div
													className="sm:basis-1/2 sm:p-4 lg:basis-1/3 lg:py-6 xl:basis-1/4 xl:py-8"
													key={partner.title}
												>
													<ProfileTeaser
														name={partner.title}
														role={translate(`partner.types.${partner.type}`)}
														description={partner.role}
														image={partner.logo?.path}
														isActive={
															partner.left && partner.left < CURRENT_YEAR ? false : true
														}
														href={partner.homepage}
													/>
												</div>
											))}
										</div>
									</ContentConstraint>
								</div>
							)
						)}
					</section>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

AboutUsPersonsPage.displayName = 'EventsPage';

export default AboutUsPersonsPage;
