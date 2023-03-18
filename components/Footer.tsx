import type { FC } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { FooterNavigation } from './FooterNavigation';
import { ContentConstraint } from './ContentConstraint';
import { useTranslation } from '../hooks/useTranslation';
import { StaticExternalUrls, StaticRoutes } from '../utils/routes';
import { EventType } from '../graphql';
import { RawLink } from './Link';
import { CorporateLogo } from './static/CorporateLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';

interface FooterProps {
	isDarkOnly?: boolean;
}

export const Footer: FC<FooterProps> = ({ isDarkOnly }) => {
	const translate = useTranslation();

	return (
		<footer className="z-30">
			<div
				className={classNames('md:py-10 bg-black text-white', {
					'border-t border-gray-900': isDarkOnly,
				})}
			>
				<ContentConstraint tag="section">
					<div className="flex flex-col xl:flex-row align-top justify-center xl:justify-between">
						<div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12 2xl:gap-20 lg:grid-cols-4">
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
									{
										href: StaticRoutes.EVENT_TIMELINE,
										children: translate('navigation.events.timeline'),
									},
								]}
							/>
							<FooterNavigation
								title={translate('footer.navigationSection.information')}
								items={[
									{
										href: `${StaticRoutes.BLOG_PAGE}/1`,
										children: translate('navigation.blog.title'),
									},
									// { href: StaticRoutes.ABOUT_US, children: translate('navigation.about.title') },
									{ href: StaticRoutes.PORTRAIT, children: translate('navigation.about.team') },
									{ href: StaticRoutes.PARTNERS, children: translate('navigation.about.partners') },
									{
										href: StaticRoutes.DATA_PROTECTION,
										children: translate('navigation.privacy.title'),
									},
									{
										href: 'https://drive.google.com/drive/folders/1g6eVXA2cW9PGQEPNkGtpA8MInt0e7olq?usp=sharing',
										children: 'Presskit',
										isStandalone: true,
										icon: (
											<ArrowRightIcon className="inline transition-all align-text-top ml-2 h-4 group-hover:ml-3" />
										),
									},
									// { href: '/about-us/impressions', children: 'Impressionen' },
									// { href: StaticRoutes.FAQ, children: translate('navigation.about.faq') },
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
										href: StaticRoutes.FESTIVAL_GUEST_APPEARANCE_INQUIRY,
										children: translate('navigation.contact.festivalGuestAppearance'),
									},
									{
										href: StaticRoutes.CONSULTING_INQUIRY,
										children: translate('navigation.contact.consulting'),
									},
									{
										href: StaticRoutes.PRESS_INQUIRY,
										children: translate('navigation.contact.press'),
									},
									{
										href: StaticRoutes.SUPPORT_INQUIRY,
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
										href: StaticExternalUrls.SOUNDCLOUD,
										children: 'Soundcloud',
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
									{
										href: StaticExternalUrls.UPPTIME,
										children: 'Service Status',
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
			<div data-nosnippet className="bg-black text-gray-100 border-t border-t-gray-800">
				<ContentConstraint useCustomYSpace tag="section" className="flex flex-row justify-between py-4">
					<div className="flex flex-row flex-nowrap justify-start items-center md:w-1/3">
						<RawLink href={StaticRoutes.HOME} title="Homepage" className="">
							<CorporateLogo className="block h-8 w-8" />
						</RawLink>
						<div className="ml-2 text-sm">
							<p className="font-semibold">Rheinklang</p>
							<p className="text-xs text-gray-300">Events, consulting & mehr.</p>
						</div>
					</div>
					{/* <p className="block w-full text-center md:w-1/3 md:text-center uppercase text-xs text-gray-200">
						Made with <HeartIcon className="inline align-text-top h-3 text-slightly-rose-700" /> in
						Switzerland
					</p> */}
					<div>
						<ul className="flex flex-row flex-wrap gap-4 text-2xl ">
							<li>
								<RawLink
									href="https://instgram.com/rheinklag"
									className="hover:text-sea-green-400 transition-colors"
								>
									<FontAwesomeIcon icon={faInstagram} />
								</RawLink>
							</li>
							<li>
								<RawLink
									href="https://facebook.com/rhnklng"
									className="hover:text-sea-green-400 transition-colors"
								>
									<FontAwesomeIcon icon={faFacebook} />
								</RawLink>
							</li>
							<li>
								<RawLink
									href="https://soundcloud.com/rhnklng"
									className="hover:text-sea-green-400 transition-colors"
								>
									<FontAwesomeIcon icon={faSoundcloud} />
								</RawLink>
							</li>
						</ul>
					</div>
				</ContentConstraint>
			</div>
		</footer>
	);
};

Footer.displayName = 'Footer';
