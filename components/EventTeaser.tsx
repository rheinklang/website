import { ArrowRightIcon, TicketIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import type { FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { formatDate, formatDateRange } from '../utils/date';
import { StaticRoutes } from '../utils/routes';
import { Badge } from './Badge';
import { Button } from './Button';
import { Image } from './Image';

export interface EventTeaserProps {
	image: string;
	slug: string;
	category?: string;
	title: string;
	isCanceled?: boolean | null;
	description: string;
	className?: string;
	date?: string | null;
	endDate?: string | null;
	ticketingUrl?: string | null;
}

export const EventTeaser: FC<EventTeaserProps> = ({
	title,
	description,
	image,
	category,
	slug,
	date,
	endDate,
	ticketingUrl,
	className,
	isCanceled = false,
}) => {
	const translate = useTranslation();

	return (
		<article
			className={classNames('flex flex-col items-start rounded-xl shadow-md', className, {
				'bg-sea-green-900 text-white': !isCanceled,
				'bg-slightly-rose-600 text-white': isCanceled,
			})}
		>
			<div className="w-full h-64 lg:h-80 relative">
				<Image
					preset="teaser"
					className={classNames('w-full h-64 object-cover rounded-t-xl lg:h-80', {
						grayscale: isCanceled,
					})}
					alt={'image'}
					src={image}
				/>
				{isCanceled && (
					<div
						role="alert"
						className="absolute top-0 right-0 left-0 bottom-0 bg-slightly-rose-500/50 rounded-t-xl text-white text-center text-xs font-bold"
					>
						<div className="flex items-center justify-center h-full">
							<p className="uppercase tracking-widest text-xl md:text-3xl">Abgesagt</p>
						</div>
					</div>
				)}
			</div>
			<div className={classNames('p-6 sm:p-4 md:p-6 w-full flex flex-col h-full')}>
				{category && <Badge>{translate(`event.type.${category}`)}</Badge>}
				<h2
					className={classNames('sm:text-3xl text-2xl title-font font-medium mt-4', {
						'line-through': isCanceled,
						'mb-4': !date,
						'mb-1': !!date,
					})}
				>
					{title}
				</h2>
				{date && (
					<p className="text-sm mb-4 text-sea-green-200">
						{date && endDate ? formatDateRange(date, endDate) : `Am ${formatDate(date)}`}
					</p>
				)}
				<p
					className={classNames('leading-relaxed mb-8', {
						'line-through': isCanceled,
					})}
				>
					{description}
				</p>
				<div className="flex items-center flex-wrap pb-4 mb- mt-auto w-full">
					{ticketingUrl && (
						<Button
							type="secondary"
							link={{ href: ticketingUrl, icon: <TicketIcon className="inline h-5 ml-2" /> }}
							className="mb-4 md:w-full xl:w-auto xl:mr-2 xl:mb-0"
						>
							Tickets
						</Button>
					)}
					<Button
						type={isCanceled ? 'danger' : 'primary'}
						className="md:w-full xl:w-auto"
						link={{
							href: `${StaticRoutes.EVENT_DETAIL}/${slug}`,
							icon: <ArrowRightIcon className="inline h-5 ml-2" />,
						}}
					>
						Zum Event
					</Button>
				</div>
			</div>
		</article>
	);
};

EventTeaser.displayName = 'EventTeaser';
