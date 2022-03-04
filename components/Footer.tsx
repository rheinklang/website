import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/solid';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { rawImageLoader } from '../utils/image-loader';
import { FooterNavigation } from './FooterNavigation';
import { ContentConstraint } from './ContentConstraint';
import { useTranslation } from '../hooks/useTranslation';

export const Footer: FC = () => {
	const translation = useTranslation();

	return (
		<footer className="z-30">
			<div className="md:py-20 bg-black text-white">
				<ContentConstraint>
					<div className="flex flex-col lg:flex-row align-top md:justify-between">
						<Link href="/">
							<a title="Homepage" className="pb-12 lg:mr-8 lg:pb-0 xl:mr-28">
								<Image
									className="hue-rotate-180"
									src="https://cockpit.rheinklang-festival.ch/storage/uploads/2020/04/07/5e8c0b6e8a7f4logo-sm.png"
									loader={rawImageLoader}
									width={150}
									height={150}
									alt="Logo"
								/>
							</a>
						</Link>
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:ml-auto">
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
								title="Services"
								items={[
									{ href: '/contact/forms/event-booking', children: 'Veranstaltung Buchen' },
									{ href: '/contact/forms/press-inquiry', children: 'Presseanfrage' },
									{ href: '/contact/forms/sponsor', children: 'Sponsoring' },
									{ href: '/contact/forms/guest-appearance', children: 'Gastauftritt' },
									{ href: '/services/consents', children: 'Cookies' },
								]}
							/>
							<FooterNavigation
								title="Plattformen"
								items={[
									{
										href: 'https://facebook.com/rhnklng',
										children: 'Facebook',
										isStandalone: true,
										icon: (
											<ArrowRightIcon className="inline transition-all align-text-top ml-2 h-4 group-hover:ml-3" />
										),
									},
									{
										href: 'https://instagram.com/rheinklang',
										children: 'Instagram',
										isStandalone: true,
										icon: (
											<ArrowRightIcon className="inline transition-all align-text-top ml-2 h-4 group-hover:ml-3" />
										),
									},
									{
										href: 'https://github.com/rheinklang',
										children: 'GitHub',
										isStandalone: true,
										icon: (
											<ArrowRightIcon className="inline transition-all align-text-top ml-2 h-4 group-hover:ml-3" />
										),
									},
								]}
							/>
						</div>
					</div>
				</ContentConstraint>
			</div>
			<div className="text-xs bg-black uppercase text-gray-100 border-t border-t-gray-800">
				<ContentConstraint tag="section" className="flex flex-col md:flex-row md:justify-between">
					<p className="block w-full text-center md:w-1/3 md:text-left">
						&copy; {new Date().getFullYear()} Rheinklang
					</p>
					<p className="block w-full text-center md:w-1/3 md:text-center">
						Made with <HeartIcon className="inline align-text-top h-3 text-slightly-rose-700" /> in
						Switzerland
					</p>
					<p className="block w-full text-center md:w-1/3 md:text-right">{process.env.CONFIG_BUILD_ID}</p>
				</ContentConstraint>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
