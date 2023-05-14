import type { FC } from 'react';
import { Image } from './Image';
import { Button } from './Button';
import { StaticRoutes } from '../utils/routes';
import { StarIcon } from '@heroicons/react/24/outline';

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
	bio?: string | null;
}

export const PersonTeaser: FC<PersonTeaserProps> = ({
	className,
	bio,
	image,
	name,
	role,
	slug,
	href,
	description,
	isActive = true,
	isFounder = false,
}) => {
	return (
		<div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
			<div className="flex-shrink-0 relative">
				<Image
					alt={name}
					src={image}
					className="rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
				/>
				{isFounder && (
					<span className="absolute left-0 top-0 bg-white rounded-br-md rounded-tl-md p-1">
						<StarIcon className="h-3 text-black" />
					</span>
				)}
			</div>
			<div className="flex-grow sm:pl-8">
				<h2 className="title-font font-medium text-lg text-gray-900">{name}</h2>
				<h3 className="text-gray-300 mb-3">{role}</h3>
				<p className="mb-4">{bio}</p>
				<Button className="cursor-pointer" link={{ href: `${StaticRoutes.MEMBER_PORTRAIT}/${slug}` }}>
					Details
				</Button>
			</div>
		</div>
	);
};

PersonTeaser.displayName = 'PersonTeaser';
