import classNames from 'classnames';
import { FC } from 'react';
import { Heading } from './Heading';
import { Image } from './Image';
import { Link } from './Link';

export interface EventCategoryCardProps {
	title: string;
	href: string;
	image: string;
	className?: string;
}

export const EventCategoryCard: FC<EventCategoryCardProps> = ({ title, href, image, className }) => {
	return (
		<div className={classNames('relative group z-50 transform shadow-sm transition-all rounded-xl', className)}>
			<Link isPureContent href={href} className="block w-full relative">
				<div className="w-full h-1/4">
					<Image isObjectFitCover src={image} alt={title} className="rounded-xl" />
					{/* <img
						className="object-cover object-center rounded-xl"
						alt="hero"
						src="https://dummyimage.com/1920x1080"
					/> */}
				</div>
				<div className="flex flex-col items-center justify-center m-8 lg:m-8 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md rounded-xl shadow-sm">
					<Heading level="2">{title}</Heading>
				</div>
			</Link>
		</div>
	);
};

EventCategoryCard.displayName = 'EventCategoryCard';
