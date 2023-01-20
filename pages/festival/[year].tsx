import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { PartnerType } from '../../graphql';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';
import { getUpcomingEvents } from '../../api/events';
import { ContentConstraint } from '../../components/ContentConstraint';
// import { useTranslation } from '../../hooks/useTranslation';
import { Heading } from '../../components/Heading';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BreadcrumbItem } from '../../components/BreadcrumbItem';
import { getFestivalByYear, getFestivalYears } from '../../api/festival';
import { Richtext } from '../../components/Richtext';
import { nonNullish } from '../../utils/filter';
import { ProfileTeaser } from '../../components/ProfileTeaser';
import classNames from 'classnames';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { StaticRoutes } from '../../utils/routes';
import { formatDate, formatDateRange } from '../../utils/date';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const year = params && params.year ? `${params.year}` : undefined;

	// data aggregation
	const allFestivalYears = await getFestivalYears();
	const festival = await getFestivalByYear(year!);
	const lineup = festival.timetable?.slots?.map((slot) => slot?.value) as Array<{
		artist: string;
		labels: string;
		playtime: string;
	}>;
	const artistsSeoString = lineup.map((entry) => `${entry.artist} (${entry.labels})`).join(', ');

	const nextEvents = await getUpcomingEvents(3, {});

	// Main provider information
	const getContentProviderProps = getContextualContentProviderFetcher('festival', {
		year,
		artists: artistsSeoString,
	});
	const contentProviderProps = await getContentProviderProps();

	// Aggregation of partial content
	const sponsors = Array.from(festival.sponsors || [])
		.filter(nonNullish)
		.sort((entry) => (entry.type === PartnerType.Mainsponsor ? -1 : 1));

	// const pastEvents = events.filter((ev) => (parseCockpitDate(ev.date) < new Date() ? true : false));
	// const upcomingEvents = events.filter((ev) => (parseCockpitDate(ev.date) < new Date() ? false : true));

	// const maybeNextRelevantEvent = nextRelevantEvents.length > 0 ? nextRelevantEvents[0] : undefined;
	// const nextRelevantEvent =
	// 	maybeNextRelevantEvent &&
	// 	parseCockpitDate(maybeNextRelevantEvent.endDate || maybeNextRelevantEvent.date) > new Date()
	// 		? maybeNextRelevantEvent
	// 		: null;

	return {
		props: {
			year,
			lineup,
			sponsors,
			// events,
			// pastEvents,
			// upcomingEvents,
			allFestivalYears,
			nextEvents,
			contentProviderProps,
			festival,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const years = await getFestivalYears();

	return {
		fallback: false,
		paths: years.map((year) => ({
			params: { year },
		})),
	};
};

const FestivalYearPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	year,
	festival,
	lineup,
	sponsors,
	allFestivalYears,
}) => {
	const router = useRouter();
	// const translate = useTranslation(contentProviderProps.translations);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					isDarkOnly
					className="bg-black text-white"
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<Breadcrumb theme="black">
						<BreadcrumbItem href={StaticRoutes.FESTIVAL}>Festival</BreadcrumbItem>
						<BreadcrumbItem isCurrent>{year}</BreadcrumbItem>
					</Breadcrumb>
					<ContentConstraint>
						<div className="max-w-3xl px-10 mx-auto">
							<h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase text-center mt-10">
								{festival.title}
							</h1>
							<p className="text-center text-xl bg-white text-black font-bold my-4">
								{festival.endDate
									? formatDateRange(festival.date, festival.endDate)
									: formatDate(festival.date)}
							</p>

							{/* Intro Block */}
							<h2 className="text-lg md:text-xl font-bold text-center my-8">{festival.introduction}</h2>

							{festival.text && (
								<div className="mb-10">
									<Richtext
										content={festival.text}
										className="prose-headings:text-white prose-p:text-white prose-a:text-sea-green-300 prose-strong:text-white prose-ul:text-white prose-ol:text-white prose-table:text-white"
									/>
								</div>
							)}

							{/* Timetable */}
							{lineup && (
								<>
									<Heading level="2">Lineup</Heading>
									<p className="mb-6">Running Order</p>
									<ol className="flex flex-col flex-wrap gap-6">
										{lineup.map((entry) => (
											<li
												key={entry.playtime}
												className="flex flex-row gap-4 align-center items-center"
											>
												<p className="grow-0 w-[80px] md:w-[120px]">{entry.playtime}</p>
												<Heading level="4" className="text-lg flex-grow">
													{entry.artist}{' '}
													{entry.labels && (
														<small className="font-normal block md:inline">
															({entry.labels})
														</small>
													)}
												</Heading>
											</li>
										))}
									</ol>
								</>
							)}
						</div>
					</ContentConstraint>

					<ContentConstraint>
						<div className="max-w-5xl px-10 mx-auto">
							<Heading level="2" className="text-center">
								Sponsoren
							</Heading>
							<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 w-full">
								{sponsors.map((sponsor) => (
									<ProfileTeaser
										key={sponsor.title}
										image={sponsor.logo?.path!}
										name={sponsor.title}
										role={sponsor.type === PartnerType.Mainsponsor ? 'Hauptsponsor' : 'Sponsor'}
										href={sponsor.homepage}
										imageBackgroundColor={sponsor.backgroundFillColor || undefined}
										starred={sponsor.type === PartnerType.Mainsponsor}
										imageMode="contain"
										className={classNames('', {
											'md:col-span-3': sponsor.type === PartnerType.Mainsponsor,
										})}
									/>
								))}
							</section>
						</div>
					</ContentConstraint>
					{festival.impressions && festival.impressions.assets && (
						<ContentConstraint useCustomYSpace className="py-16">
							<Heading level="2" className="text-center mb-10">
								Impressionen
							</Heading>
							<div className="md:max-w-5xl px-10 mx-auto text-white grid grid-cols-1 md:grid-cols-2 gap-4">
								{festival.impressions.assets.map((item) => (
									<div key={item?.value?._id} className="aspect-h-9 aspect-2 bg-gray-300 rounded-md">
										<Image
											isObjectFitCover
											src={item?.value?.path}
											alt={item?.value?.description}
											className="rounded-md"
										/>
									</div>
								))}
							</div>
							{/* TODO: Button zu den Impressions! */}
						</ContentConstraint>
					)}
					<ContentConstraint useCustomYSpace className="py-16">
						<Heading level="2" className="text-center">
							Alle Festivals
						</Heading>
						<div className="md:max-w-3xl px-10 mx-auto text-xl text-center py-10">
							<ul className="flex flex-col flex-wrap gap-4">
								{allFestivalYears
									.filter((yearIndex) => year !== yearIndex)
									.map((yearIndex) => (
										<li key={yearIndex}>
											<Link
												href={`${StaticRoutes.FESTIVAL_YEAR}/${yearIndex}`}
												className="text-sea-green-300 hover:text-sea-green-400 transition-colors"
											>
												Rheinklang Festival {yearIndex}
											</Link>
										</li>
									))}
							</ul>
						</div>
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

FestivalYearPage.displayName = 'FestivalYearPage';

export default FestivalYearPage;
