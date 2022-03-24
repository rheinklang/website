import { FC } from 'react';
import { HeartIcon } from '@heroicons/react/solid';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { FooterNavigation } from './FooterNavigation';
import { ContentConstraint } from './ContentConstraint';
import { useTranslation } from '../hooks/useTranslation';
import { StaticExternalUrls, StaticRoutes } from '../utils/routes';
import { EventType } from '../graphql';
import { Link } from './Link';
import { CorporateLogo } from './static/CorporateLogo';

export const Footer: FC = () => {
	const translate = useTranslation();

	return (
		<footer className="z-30">
			<div className="md:py-20 bg-black text-white">
				<ContentConstraint>
					<div className="flex flex-col lg:flex-row align-top md:justify-between">
						<Link href={StaticRoutes.HOME} title="Homepage" className="pb-12 lg:mr-8 lg:pb-0 xl:mr-28">
							<CorporateLogo className="h-36 w-36" />
						</Link>
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:gap-12 lg:grid-cols-4 lg:ml-auto">
							<FooterNavigation
								title={translate('footer.navigationSection.events')}
								items={[
									{
										href: StaticRoutes.EVENTS,
										children: translate('navigation.events.overviewTitle'),
									},
									{
										href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Festival}`,
										children: translate('navigation.events.festivals'),
									},
									{
										href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Daydance}`,
										children: translate('navigation.events.daydances'),
									},
									{
										href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Cooperation}`,
										children: translate('navigation.events.cooperations'),
									},
									{
										href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Showcase}`,
										children: translate('navigation.events.showcases'),
									},
									{
										href: StaticRoutes.LIVESTREAM,
										children: translate('navigation.events.livestream'),
									},
								]}
							/>
							<FooterNavigation
								title={translate('footer.navigationSection.information')}
								items={[
									{ href: StaticRoutes.ABOUT_US, children: translate('navigation.about.title') },
									{ href: StaticRoutes.PORTRAIT, children: translate('navigation.about.team') },
									{ href: StaticRoutes.PARTNERS, children: translate('navigation.about.partners') },
									{ href: '/about-us/impressions', children: 'Impressionen' },
									{ href: StaticRoutes.FAQ, children: translate('navigation.about.faq') },
								]}
							/>
							<FooterNavigation
								title={translate('footer.navigationSection.services')}
								items={[
									{
										href: StaticRoutes.EVENT_INQUIRY,
										children: translate('navigation.contact.eventBooking'),
									},
									{
										href: StaticRoutes.PRESS_INQUIRY,
										children: translate('navigation.contact.festivalGuestAppearance'),
									},
									{
										href: StaticRoutes.SPONSOR_INQUIRY,
										children: translate('navigation.contact.press'),
									},
									{
										href: StaticRoutes.FESTIVAL_GUEST_APPEARANCE_INQUIRY,
										children: translate('navigation.contact.support'),
									},
									{ href: '/services/settings', children: translate('navigation.services.settings') },
								]}
							/>
							<FooterNavigation
								title={translate('footer.navigationSection.externalPlatforms')}
								items={[
									{
										href: StaticExternalUrls.FACEBOOK,
										children: 'Facebook',
										isStandalone: true,
										icon: (
											<ArrowRightIcon className="inline transition-all align-text-top ml-2 h-4 group-hover:ml-3" />
										),
									},
									{
										href: StaticExternalUrls.INSTAGRAM,
										children: 'Instagram',
										isStandalone: true,
										icon: (
											<ArrowRightIcon className="inline transition-all align-text-top ml-2 h-4 group-hover:ml-3" />
										),
									},
									{
										href: StaticExternalUrls.GITHUB,
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
