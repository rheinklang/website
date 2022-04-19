import { BadgeCheckIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { CockpitAsset, Maybe, TeamMemberLink, TeamMemberLinkCollection } from '../../graphql';
import { useTranslation } from '../../hooks/useTranslation';
import { ContentConstraint } from '../ContentConstraint';
import { Heading } from '../Heading';
import { Image } from '../Image';
import { Link } from '../Link';

export interface MemberPortraitPageComponentProps {
	image?: {
		path: string;
	} | null;
	name: string;
	isFounder?: boolean;
	primaryActivityArea?: string;
	favoriteDrink?: string | null;
	favoriteGenre?: string | null;
	bio?: string | null;
	links?: TeamMemberLinkCollection['value'] | null;
}

export const MemberPortraitPageComponent: FC<MemberPortraitPageComponentProps> = ({
	image,
	name,
	favoriteDrink,
	favoriteGenre,
	bio,
	isFounder = false,
	links,
	primaryActivityArea,
}) => {
	const translate = useTranslation();

	return (
		<div>
			<ContentConstraint>
				<article className="flex flex-col">
					<header className="text-center md:text-left md:flex md:flex-row md:flex-nowrap md:items-center">
						<div className="rounded-full w-64 h-64 mx-auto md:mx-0">
							<Image isObjectFitCover src={image?.path || '#'} alt={name} className="rounded-full" />
						</div>
						<div className="mt-8 md:mt-0 md:ml-8">
							<Heading level="1">{name}</Heading>
							<p className="text-gray-600">
								<span>
									{isFounder ? 'Migründer' : 'Teammitglied'}
									{isFounder && (
										<BadgeCheckIcon className="inline-block align-text-top text-alpine-green-400 h-5 w-5 ml-1" />
									)}
								</span>
							</p>
						</div>
					</header>
					<div className="mt-8">
						<ul>
							<li className="mb-2">
								<b className="block sm:inline-block sm:w-1/2 md:w-44">Bereich</b>
								{translate(`team.roles.${primaryActivityArea}`)}
							</li>
							<li className="mb-2">
								<b className="block sm:inline-block sm:w-1/2 md:w-44">Heimgenre</b>
								{favoriteGenre}
							</li>
							<li>
								<b className="block sm:inline-block sm:w-1/2 md:w-44">Lieblingsgetränk</b>
								{favoriteDrink}
							</li>
						</ul>
					</div>
					<div className="mt-8">
						<p className="text-lg">{bio}</p>
					</div>
					<div className="mt-8">
						<ul>
							{links?.map((link) => (
								<li key={link?.url}>
									<Link href={link?.url || '#'}>{link?.label}</Link>
								</li>
							))}
						</ul>
					</div>
				</article>
			</ContentConstraint>
		</div>
	);
};

MemberPortraitPageComponent.displayName = 'MemberPortraitPageComponent';
