import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getPartnerPage } from '../../api/pages';
import { getLevelClusteredPartners, getPartnerHallOfFame } from '../../api/partners';
import { getTeamMembersList } from '../../api/team';
import { ContentConstraint } from '../../components/ContentConstraint';
import { ContentHeader } from '../../components/ContentHeader';
import { Heading } from '../../components/Heading';
import { PageLayout } from '../../components/layouts/PageLayout';
import { Link } from '../../components/Link';
import { ProfileTeaser } from '../../components/ProfileTeaser';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { JsonLd } from '../../components/utils/JsonLd';
import { PartnerLevel, PartnerType } from '../../graphql';
import { useTranslation } from '../../hooks/useTranslation';
import { CURRENT_YEAR } from '../../utils/date';

export async function getStaticProps() {
	const partners = await getLevelClusteredPartners();
	const hallOfFame = await getPartnerHallOfFame();
	const pageData = await getPartnerPage();

	const getContentProviderProps = getContextualContentProviderFetcher('partners');
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			contentProviderProps,
			pageData,
			partners,
			hallOfFame,
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
	hallOfFame,
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
					{/* border-t border-b border-gray-800 */}
					<section className="bg-gray-50 py-12 lg:py-12">
						{LEVEL_ORDER.map((level, levelIndex) =>
							partners.cluster[level].length === 0 ? null : (
								<div
									key={level + partners.cluster[level].length}
									className={classNames('border-gray-100 py-12', {
										'border-b': levelIndex !== LEVEL_ORDER.length - 1,
									})}
								>
									<ContentConstraint tag="section">
										<hgroup className="mb-16 sm:mb-8">
											<Heading level="2" className="text-sea-green-700 text-center uppercase">
												{level}
											</Heading>
										</hgroup>
										<div className="flex flex-row flex-wrap items-stretch justify-evenly">
											{partners.cluster[level]
												.sort((a, b) => {
													const textA = a.title.toUpperCase();
													const textB = b.title.toUpperCase();
													return textA < textB ? -1 : textA > textB ? 1 : 0;
												})
												.sort((entry) => (entry.type === PartnerType.Mainsponsor ? -1 : 1))
												.map((partner) => (
													<article
														key={`${level}-${partner.title}`}
														className={classNames(
															'basis-full mb-8 sm:basis-1/2 sm:p-4 lg:basis-1/3 lg:py-6 xl:basis-1/4 xl:py-8',
															{
																'sm:basis-full':
																	partner.type === PartnerType.Mainsponsor,
															}
														)}
													>
														<ProfileTeaser
															name={partner.title}
															role={translate(`partner.type.${partner.type}`)}
															description={partner.role}
															image={partner.logo?.path || 'TODO_FALLBACK_IMAGE'}
															imageMode="contain"
															imageBackgroundColor={
																partner.backgroundFillColor || undefined
															}
															starred={partner.type === PartnerType.Mainsponsor}
															isActive={
																partner.left && partner.left < CURRENT_YEAR
																	? false
																	: true
															}
															href={partner.homepage}
														/>
														<JsonLd
															schema={{
																'@type': 'ImageObject',
																contentUrl: partner.logo?.path,
																copyrightHolder: {
																	'@type': 'Organization',
																	name: partner.title,
																	url: partner.homepage,
																},
																creator: {
																	'@type': 'Organization',
																	name: partner.title,
																	url: partner.homepage,
																},
															}}
														/>
													</article>
												))}
										</div>
									</ContentConstraint>
								</div>
							)
						)}
					</section>
					<section className="bg-sea-green-200 py-12 lg:py-12">
						<ContentConstraint className="text-center">
							<Heading level="2" className="text-sea-green-700 text-center uppercase mb-4">
								Ehemalige
							</Heading>
							<ul className="text-sm text-sea-green-500">
								{hallOfFame.map((partner) => (
									<li key={partner.title} className="mb-2">
										<Link href={partner.homepage} className="hover:text-sea-green-400">
											<span className="font-semibold mr-2">{partner.title}</span>
											{partner.left && partner.since === partner.left && (
												<span>({partner.since})</span>
											)}
											{partner.left && partner.since !== partner.left && (
												<span>
													({partner.since} – {partner.left})
												</span>
											)}
										</Link>
									</li>
								))}
							</ul>
						</ContentConstraint>
					</section>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

AboutUsPersonsPage.displayName = 'EventsPage';

export default AboutUsPersonsPage;
