import { FC } from 'react';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/solid';
import { FooterNavigation } from './FooterNavigation';
import { ArrowRightIcon, LinkIcon } from '@heroicons/react/outline';
import { ContentConstraint } from './ContentConstraint';

export const Footer: FC = () => {
	return (
		<footer className="z-30">
			<div className="md:py-20 bg-black text-white">
				<ContentConstraint>
					<div className="flex flex-col md:flex-row align-top md:justify-between">
						<Link href="/">
							<a title="Homepage" className="pb-12 md:pb-0">
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
					</div>
				</ContentConstraint>
			</div>
			<div className="text-xs bg-black uppercase text-white border-t border-t-gray-800">
				<ContentConstraint tag="section" className="flex flex-col md:flex-row md:justify-between">
					<p className="block w-full text-center md:w-auto md:text-left">
						&copy; {new Date().getFullYear()} Rheinklang
					</p>
					<p className="block w-full text-center md:w-auto md:text-right">
						Made with <HeartIcon className="inline align-text-top h-3 text-slightly-rose-700" /> in
						Switzerland
					</p>
				</ContentConstraint>
			</div>
		</footer>
	);
};
