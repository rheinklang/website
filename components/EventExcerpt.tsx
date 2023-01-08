import { ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { format } from 'date-fns';
import { Location } from '../graphql';
import { Badge } from './Badge';
import { Button } from './Button';
import { Heading } from './Heading';
import { StaticRoutes } from '../utils/routes';
import { useTranslation } from '../hooks/useTranslation';
import { TinyCalendarIndicator } from './CalendarIndicator';

export interface EventExcerptProps {
	title: string;
	category: string;
	description: string;
	date: string;
	location?: Pick<Location, 'name' | 'country'> | null;
	slug: string;
	className?: string;
}

export const EventExcerpt: FC<EventExcerptProps> = ({ title, date, category, description, location, slug }) => {
	const translate = useTranslation();

	return (
		<article className="h-full flex flex-nowrap items-start justify-items-stretch">
			<div className="w-16 mt-10 mr-2 flex-shrink-0 flex flex-col text-center leading-none rounded-xl bg-white">
				<TinyCalendarIndicator date={date} />
			</div>
			<div className="flex-grow flex flex-col h-full pl-6">
				<Badge type="secondary" className="mb-3">
					{translate(`event.type.${category}`)}
				</Badge>
				<Heading level="3" className="mb-1 text-white">
					{title}
				</Heading>
				{/* <h1 className="title-font text-xl font-medium text-gray-900 mb-3">Event Title</h1> */}
				<p className="leading-relaxed mb-2 text-white">{description}</p>
				<div className="mt-auto">
					<p className="inline-flex items-center text-sea-green-900">
						<MapPinIcon className="inline-block h-4 " />
						<span className="flex-grow flex flex-col pl-3">
							{location && (
								<span className="title-font font-medium">
									{location.name}, {location.country}
								</span>
							)}
						</span>
					</p>
					<div className="flex mt-4">
						<Button
							type="black"
							link={{
								href: `${StaticRoutes.EVENT_DETAIL}/${slug}`,
								children: 'Details',
								icon: <ArrowRightIcon className="inline ml-2 h-4" />,
							}}
						/>
					</div>
				</div>
			</div>
		</article>
	);
};

EventExcerpt.displayName = 'EventExcerpt';
