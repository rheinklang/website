import { FC } from 'react';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/solid';
import { ContentContainer } from './ContentContainer';
import { FooterNavigation } from './FooterNavigation';
import { ArrowRightIcon, LinkIcon } from '@heroicons/react/outline';

export const Footer: FC = () => {
	return (
		<footer className="z-30 w-full ">
			<div className="px-4 py-24 bg-black text-white sm:px-4">
				<ContentContainer isFlexContainer itemsAlignment="start">
					<Link href="/">
						<a title="Homepage" className="flex items-center">
							Rheinklang Brand
						</a>
					</Link>
					<FooterNavigation
						title="Veranstaltungen"
						items={[
							{ href: '/events', children: 'Übersicht' },
							{ href: '/events/festival', children: 'Festival' },
							{ href: '/events/daydance', children: 'DayDances' },
							{ href: '/events/cooperation', children: 'Kooperationen' },
						]}
					/>
					<FooterNavigation
						title="Informationen"
						items={[
							{ href: '/about-us', children: 'Über Uns' },
							{ href: '/about-us/persons', children: 'Personen' },
							{ href: '/about-us/partners-and-sponsors', children: 'Partner & Sponsoren' },
							{ href: '/about-us/impressions', children: 'Impressionen' },
						]}
					/>
					<FooterNavigation
						title="Kontakt"
						items={[
							{ href: '/contact/forms/event-booking', children: 'Veranstaltung Buchen' },
							{ href: '/contact/forms/press-inquiry', children: 'Presseanfrage' },
							{ href: '/contact/forms/sponsor', children: 'Sponsoring' },
							{ href: '/contact/forms/guest-appearance', children: 'Gastauftritt' },
						]}
					/>
					<FooterNavigation
						title="Social Media"
						items={[
							{
								href: 'https://facebook.com/rhnklng',
								children: 'Facebook',
								icon: <ArrowRightIcon className="inline align-text-top ml-2 h-4" />,
							},
							{
								href: 'https://instagram.com/rheinklang',
								children: 'Instagram',
								icon: <ArrowRightIcon className="inline align-text-top ml-2 h-4" />,
							},
						]}
					/>
				</ContentContainer>
			</div>
			<div className="text-xs bg-sea-green-300 uppercase text-sea-green-900 py-4 px-2 sm:px-4">
				<ContentContainer isFlexContainer>
					<p>&copy; {new Date().getFullYear()} Rheinklang</p>
					<p>
						Made with <HeartIcon className="inline align-text-top h-3 text-slightly-rose-100" /> in
						Switzerland
					</p>
				</ContentContainer>
			</div>
		</footer>
	);
};
