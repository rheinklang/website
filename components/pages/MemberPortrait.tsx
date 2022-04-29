import { ArrowRightIcon, BadgeCheckIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { getTeamMemberPortrait } from '../../api/team';
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
	links?: Awaited<ReturnType<typeof getTeamMemberPortrait>>['links'];
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
			<ContentConstraint useCustomYSpace className="max-w-6xl my-16">
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
					{bio && (
						<div className="mt-8">
							<Heading level="4">Über mich</Heading>
							<p className="mt-2 text-lg md:w-5/6">{bio}</p>
						</div>
					)}
					<div className="mt-8">
						<ul>
							<li className="mb-8">
								<Heading level="4">Mein Arbeitsbereich</Heading>
								<p className="mt-2 text-lg">{translate(`team.roles.${primaryActivityArea}`)}</p>
							</li>
							{favoriteGenre && (
								<li className="mb-8">
									<Heading level="4">Mein Heimgenre</Heading>
									<p className="mt-2 text-lg">{favoriteGenre}</p>
								</li>
							)}
							{favoriteDrink && (
								<li>
									<Heading level="4">Mein Lieblingsgetränk ist</Heading>
									<p className="mt-2 text-lg">{favoriteDrink}</p>
								</li>
							)}
						</ul>
					</div>
					{links && (
						<div className="mt-8">
							<Heading level="4">Weiterführende Links</Heading>
							<ul className="mt-2">
								{links.map((link) => (
									<li key={link?.value?.url} className="my-1">
										<Link
											isStandalone
											className="text-sea-green-500"
											href={link?.value?.url || '#'}
											icon={<ArrowRightIcon className="ml-1 h-5 inline-block" />}
										>
											{link?.value?.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</article>
			</ContentConstraint>
		</div>
	);
};

MemberPortraitPageComponent.displayName = 'MemberPortraitPageComponent';
