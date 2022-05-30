import { ArrowRightIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { getUpcomingEvents } from '../../api/events';
import { useTranslation } from '../../hooks/useTranslation';
import { formatDate, formatDateRange } from '../../utils/date';
import { StaticRoutes } from '../../utils/routes';
import { Button } from '../Button';
import { ContentConstraint } from '../ContentConstraint';
import { Link, RawLink } from '../Link';
import { Tag } from '../Tag';

interface EventTimelineEntryProps {
	title: string;
	description: string;
	date: string;
	link: string;
	endDate?: string | null;
	category?: string | null;
	location?: string | null;
}

const EventTimelineEntry: FC<EventTimelineEntryProps> = ({ title, description, date, endDate, link }) => {
	const translate = useTranslation();

	return (
		<li className="mb-10 ml-6">
			<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
			<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
				{endDate ? formatDateRange(date, endDate) : `Am ${formatDate(date)}`}
			</time>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
			<p className="mb-4 max-w-3xl text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
			<RawLink href={link} className="text-sea-green-400 transition-all hover:text-sea-green-300">
				{translate('common.action.details')} <ArrowRightIcon className="inline-block h-4 mb-1" />
			</RawLink>
		</li>
	);
};

EventTimelineEntry.displayName = 'EventTimelineEntry';

export interface EventTimelinePageContentProps {
	upcomingEvents: Awaited<ReturnType<typeof getUpcomingEvents>>;
}

export const EventTimelinePageContent: FC<EventTimelinePageContentProps> = ({ upcomingEvents }) => {
	return (
		<ContentConstraint useCustomYSpace className="py-12">
			<div className="mx-auto max-w-4xl">
				<ol className="relative border-l border-gray-200 dark:border-gray-700">
					{upcomingEvents.map((event) => (
						<EventTimelineEntry
							key={event.slug + event.date}
							title={event.title}
							description={event.excerpt}
							date={event.date}
							endDate={event.endDate}
							link={`${StaticRoutes.EVENT_DETAIL}/${event.slug}`}
							category={event.type}
							location={event.location?.name}
						/>
					))}
				</ol>
			</div>
		</ContentConstraint>
	);
};

EventTimelinePageContent.displayName = 'EventTimelinePage';
