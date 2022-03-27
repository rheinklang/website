import { ArrowRightIcon, LinkIcon, StarIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { FC } from 'react';
import { Button } from './Button';
import { Image } from './Image';
import { RawLink } from './Link';

export interface ProfileTeaserProps {
	className?: string;
	image: string;
	name: string;
	role: string;
	href?: string;
	description?: string;
	starred?: boolean;
	isActive?: boolean;
	imageBackgroundColor?: string;
	imageMode?: 'cover' | 'contain';
}

export const ProfileTeaser: FC<ProfileTeaserProps> = ({
	className,
	image,
	name,
	role,
	href,
	description,
	starred,
	imageMode = 'cover',
	imageBackgroundColor = '#ffffff',
	isActive = true,
}) => {
	return (
		<div
			className={classNames(
				'flex flex-col',
				'relative w-full mt-20 mx-auto max-w-xl rounded-lg shadow-lg px-5 py-4',
				'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-50',

				className
			)}
		>
			<div className="w-full pt-1 text-center -mt-24 mx-auto">
				<RawLink
					href={href || `#${name}`}
					className={classNames('relative rounded-full overflow-hidden inline-block shadow-sm', {
						'p-4': imageMode === 'contain',
					})}
					style={{ backgroundColor: imageBackgroundColor }}
				>
					<Image
						alt={name}
						src={image}
						className={classNames('mx-auto h-40 w-40', {
							'object-contain p-1': imageMode === 'contain',
							'object-cover': imageMode === 'cover',
						})}
					/>
				</RawLink>
			</div>
			<div className="text-center mb-6 mt-4 grow basis-auto shrink-0">
				<p className="text-gray-800 dark:text-white text-xl font-medium">{name}</p>
				<p className="text-gray-600 text-sm">{role}</p>
				<p className="text-gray-400 text-xs">{description}</p>
				{starred && (
					<span className="bg-sea-green-200 rounded-full p-1 absolute top-4 right-4">
						<StarIcon className="h-5 w-5 text-sea-green-500 " />
					</span>
				)}
			</div>
			{href && (
				<>
					<Button
						className="mx-auto"
						link={{ href, icon: <ArrowRightIcon className="inline align-top h-6 w-6 pl-2" /> }}
					>
						Zur Website
					</Button>
				</>
			)}
			{/* <button
					type="button"
					className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
				>
					Add
				</button> */}
		</div>
	);
};

ProfileTeaser.displayName = 'ProfileTeaser';
