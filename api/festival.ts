import {
	client,
	EventsPreviewDocument,
	EventsPreviewQuery,
	AllEventSlugsQuery,
	AllEventSlugsDocument,
	EventByFilterQuery,
	EventByFilterDocument,
	EventOverviewQuery,
	EventOverviewDocument,
	EventsByCategoryOverviewDocument,
	EventsByCategoryOverviewQuery,
	FestivalDetailQueryQuery,
	FestivalDetailQueryDocument,
	FestivalYearsQueryQuery,
	FestivalYearsQueryDocument,
	FestivalOverviewQueryQuery,
	FestivalOverviewQueryDocument,
} from '../graphql';
import { nonNullish } from '../utils/filter';

export const getFestivalYears = async () => {
	const result = await client.query<FestivalYearsQueryQuery>({
		query: FestivalYearsQueryDocument,
	});

	return result.data.festivalsCollection.filter(nonNullish).map((entry) => entry.year);
};

export const getFestivalsOverview = async () => {
	const result = await client.query<FestivalOverviewQueryQuery>({
		query: FestivalOverviewQueryDocument,
	});

	return result.data.festivalsCollection.filter(nonNullish);
};

export const getFestivalByYear = async (year: string) => {
	const result = await client.query<FestivalDetailQueryQuery>({
		query: FestivalDetailQueryDocument,
		variables: {
			limit: 1,
			filter: { year },
		},
	});

	return result.data.festivalsCollection.filter(nonNullish)[0];
};
