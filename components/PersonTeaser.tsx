import type { FC } from 'react';
import { Image } from './Image';
import { Button } from './Button';
import { StaticRoutes } from '../utils/routes';

export interface PersonTeaserProps {
	className?: string;
	image: string;
	name: string;
	role: string;
	href?: string;
	slug: string;
	description?: string;
	isActive?: boolean;
	isFounder?: boolean;
}

export const PersonTeaser: FC<PersonTeaserProps> = ({
	className,
	image,
	name,
	role,
	slug,
	href,
	description,
	isActive = true,
}) => {
	return (
		<div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
			<Image
				alt={name}
				src={image}
				className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
			/>
			<div className="flex-grow sm:pl-8">
				<h2 className="title-font font-medium text-lg text-gray-900">{name}</h2>
				<h3 className="text-gray-300 mb-3">{role}</h3>
				<p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
				<Button link={{ href: `${StaticRoutes.MEMBER_PORTRAIT}/${slug}` }}>Details</Button>
			</div>
		</div>
	);
};

PersonTeaser.displayName = 'PersonTeaser';
