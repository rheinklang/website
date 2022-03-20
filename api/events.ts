import { EventType } from 'react-hook-form';
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
} from '../graphql';
import { parseCockpitDate } from '../utils/date';
import { nonNullish } from '../utils/filter';

export const getAllEventSlugs = async () => {
	const result = await client.query<AllEventSlugsQuery>({
		query: AllEventSlugsDocument,
	});

	return result.data.eventsCollection.filter(nonNullish).map((event) => event.slug);
};

export const getEventOverview = async () => {
	const result = await client.query<EventOverviewQuery>({
		query: EventOverviewDocument,
	});

	return result.data.eventOverviewCollection.filter(nonNullish);
};

export const getEventBySlug = async (slug: string) => {
	const result = await client.query<EventByFilterQuery>({
		query: EventByFilterDocument,
		variables: {
			limit: 1,
			filter: { slug },
		},
	});

	return result.data.eventsCollection.filter(nonNullish)[0];
};

export const getEventsByType = async (eventType: string) => {
	const result = await client.query<EventsByCategoryOverviewQuery>({
		query: EventsByCategoryOverviewDocument,
		variables: {
			sort: { date: -1 },
			filter: { type: eventType },
		},
	});

	return result.data.eventsCollection.filter(nonNullish);
};

export const getUpcomingEvents = async (limit: number = 5, filter?: Record<string, any>) => {
	const result = await client.query<EventsPreviewQuery>({
		query: EventsPreviewDocument,
		variables: {
			filter,
		},
	});

	const safeResult = result.data.eventsCollection.filter(nonNullish);

	const computedResult = safeResult
		.filter((ev) => {
			const eventDate = parseCockpitDate(ev.date);

			if (eventDate < new Date()) {
				return false;
			}

			return true;
		})
		.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			return dateA < dateB ? 1 : -1;
		})
		.sort(
			(a, b) =>
				Math.abs(Date.now() - new Date(a.date).valueOf()) - Math.abs(Date.now() - new Date(b.date).valueOf())
		);

	return computedResult.slice(0, limit);
};
