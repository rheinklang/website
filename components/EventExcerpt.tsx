import { ArrowRightIcon, LinkIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Heading } from './Heading';

export interface EventExcerptProps {
	className?: string;
}

export const EventExcerpt: FC<EventExcerptProps> = ({ className }) => (
	<article className="h-full flex items-start">
		<div className="w-12 mt-10 flex-shrink-0 flex flex-col text-center leading-none rounded-xl bg-white">
			<span className="pt-2 pb-2 mb-2 border-b-2 text-gray-300 border-gray-100">Jul</span>
			<span className="pb-2 font-medium text-lg title-font leading-none text-gray-500">18</span>
		</div>
		<div className="flex-grow pl-6">
			<Badge type="secondary" className="mb-3">
				EVENT CATEGORY
			</Badge>
			<Heading level="3" className="mb-1 text-white">
				Event Title
			</Heading>
			{/* <h1 className="title-font text-xl font-medium text-gray-900 mb-3">Event Title</h1> */}
			<p className="leading-relaxed mb-2 text-white">
				Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.
			</p>
			<p className="inline-flex items-center text-sea-green-900">
				<LocationMarkerIcon className="inline-block h-4 " />
				<span className="flex-grow flex flex-col pl-3">
					<span className="title-font font-medium">Location Name, Country</span>
				</span>
			</p>
			<div className="flex mt-4">
				<Button
					type="black"
					link={{ href: '/', children: 'Details', icon: <ArrowRightIcon className="inline ml-2 h-4" /> }}
				/>
			</div>
		</div>
	</article>
);

EventExcerpt.displayName = 'EventExcerpt';
