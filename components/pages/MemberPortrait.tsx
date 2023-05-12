import { FC } from 'react';
import { LinkIcon, CheckBadgeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faApple,
	faFacebook,
	faInstagram,
	faLinkedin,
	faSpotify,
	faTwitter,
	faXing,
} from '@fortawesome/free-brands-svg-icons';

import { getTeamMemberPortrait } from '../../api/team';
import { useTranslation } from '../../hooks/useTranslation';
import { formatDate } from '../../utils/date';
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
	entryDate?: string | null;
	links?: Awaited<ReturnType<typeof getTeamMemberPortrait>>['links'];
}

const getGuessedLinkIcon = (link: { url?: string | null; label?: string | null }) => {
	if (!link.url || !link.label) {
		return;
	}

	if (link.url.includes('instagram.com')) {
		return <FontAwesomeIcon icon={faInstagram} />;
	}

	if (link.url.includes('facebook.com')) {
		return <FontAwesomeIcon icon={faFacebook} />;
	}

	if (link.url.includes('twitter.com')) {
		return <FontAwesomeIcon icon={faTwitter} />;
	}

	if (link.url.includes('spotify.com')) {
		return <FontAwesomeIcon icon={faSpotify} />;
	}

	if (link.url.includes('music.apple.com')) {
		return <FontAwesomeIcon icon={faApple} />;
	}

	if (link.url.includes('linkedin.com')) {
		return <FontAwesomeIcon icon={faLinkedin} />;
	}

	if (link.url.includes('xing.com')) {
		return <FontAwesomeIcon icon={faXing} />;
	}

	return <LinkIcon className="inline-block h-4 align-middle" />;
};

export const MemberPortraitPageComponent: FC<MemberPortraitPageComponentProps> = ({
	image,
	name,
	favoriteDrink,
	favoriteGenre,
	bio,
	entryDate,
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
						<div className="rounded-lg w-64 h-64 mx-auto md:mx-0">
							<Image isObjectFitCover src={image?.path || '#'} alt={name} className="rounded-lg" />
						</div>
						<div className="mt-8 md:mt-0 md:ml-8">
							<p className="text-gray-600 mb-1">
								<span>
									{isFounder ? 'Migründer' : 'Teammitglied'}
									{!isFounder && (
										<UserGroupIcon className="inline-block align-text-top text-sea-green-400 h-5 w-5 ml-1" />
									)}
									{isFounder && (
										<CheckBadgeIcon className="inline-block align-text-top text-alpine-green-400 h-5 w-5 ml-1" />
									)}
								</span>
							</p>
							<Heading level="1">{name}</Heading>
							{entryDate && (
								<p className="text-gray-300 text-sm">
									Beigetreten am {''}
									{formatDate(entryDate)}
								</p>
							)}
						</div>
					</header>
					{bio && (
						<div className="mt-8">
							<Heading level="4">Über mich</Heading>
							<p className="mt-2 text-lg md:w-5/6">{bio}</p>
						</div>
					)}
					<hr className="mt-8 h-px bg-gray-100 border-0" />
					<div className="mt-8">
						<ul>
							<li className="mb-8">
								<Heading level="5">Was ist dein Arbeitsbereich?</Heading>
								<p className="mt-2 text-lg">{translate(`team.roles.${primaryActivityArea}`)}</p>
							</li>
							{favoriteGenre && (
								<li className="mb-8">
									<Heading level="5">In welchem Genre fühlst du dich zuhause?</Heading>
									<p className="mt-2 text-lg">{favoriteGenre}</p>
								</li>
							)}
							{favoriteDrink && (
								<li>
									<Heading level="5">Welches Getränk bestellst du dir an der Bar?</Heading>
									<p className="mt-2 text-lg">{favoriteDrink}</p>
								</li>
							)}
						</ul>
					</div>
					{links && (
						<>
							<hr className="mt-8 h-px bg-gray-100 border-0" />
							<div className="mt-8">
								<Heading level="4">Weiterführende Links</Heading>
								<ul className="mt-2">
									{links.map((link) => (
										<li key={link?.value?.url} className="my-1">
											<Link
												isStandalone
												className="text-sea-green-500"
												href={link?.value?.url || '#'}
											>
												<span className="inline-block w-5 mr-1">
													{getGuessedLinkIcon({
														url: link?.value?.url,
														label: link?.value?.label,
													})}
												</span>
												{link?.value?.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</>
					)}
				</article>
			</ContentConstraint>
		</div>
	);
};

MemberPortraitPageComponent.displayName = 'MemberPortraitPageComponent';
