import { FC, useCallback, useState } from 'react';
import {
	ArrowRightIcon,
	BriefcaseIcon,
	CalendarIcon,
	FlagIcon,
	InboxIcon,
	BoltIcon,
	Bars3Icon,
	MusicalNoteIcon,
	NewspaperIcon,
	SunIcon,
	LifebuoyIcon,
	UserGroupIcon,
	UsersIcon,
	VideoCameraIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Button } from './Button';
import { MainNavigationItem, MainNavigationItemProps } from './MainNavigationItem';
import { useTranslation } from '../hooks/useTranslation';
import type { ContentProviderProps } from './utils/ContentProvider';
import { StaticRoutes } from '../utils/routes';
import { EventType } from '../graphql';

const getMainNavigationTree = (translate: ReturnType<typeof useTranslation>): MainNavigationItemProps[] => [
	{
		title: translate('navigation.events.title'),
		href: StaticRoutes.EVENTS,
		expansion: {
			items: [
				{
					title: translate('navigation.events.festivals'),
					href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Festival}`,
					icon: FlagIcon,
				},
				{
					title: translate('navigation.events.daydances'),
					href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Daydance}`,
					icon: SunIcon,
				},
				{
					title: translate('navigation.events.cooperations'),
					href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Cooperation}`,
					icon: UsersIcon,
				},
				{
					title: translate('navigation.events.showcases'),
					href: `${StaticRoutes.EVENT_CATEGORY}/${EventType.Showcase}`,
					icon: BoltIcon,
				},
				{
					title: translate('navigation.events.livestream'),
					href: StaticRoutes.LIVESTREAM,
					icon: VideoCameraIcon,
				},
				{
					title: translate('navigation.events.timeline'),
					href: StaticRoutes.EVENT_TIMELINE,
					icon: CalendarIcon,
				},
			],
		},
	},
	{
		title: translate('navigation.blog.title'),
		href: `${StaticRoutes.BLOG}/page/1`,
	},
	{
		title: translate('navigation.about.title'),
		href: StaticRoutes.PORTRAIT, // TODO: build landing page
		expansion: {
			items: [
				{
					title: translate('navigation.about.team'),
					href: StaticRoutes.PORTRAIT,
					icon: UserGroupIcon,
				},
				{
					title: translate('navigation.about.partners'),
					href: StaticRoutes.PARTNERS,
					icon: BriefcaseIcon,
				},
				// TODO: This section
				// {
				// 	title: translate('navigation.about.faq'),
				// 	href: StaticRoutes.FAQ,
				// 	icon: QuestionMarkCircleIcon,
				// },
			],
		},
	},
	{
		title: translate('navigation.contact.title'),
		href: StaticRoutes.CONTACT, // TODO: build index page
		expansion: {
			items: [
				{
					title: translate('navigation.contact.eventBooking'),
					href: StaticRoutes.EVENT_INQUIRY,
					icon: InboxIcon,
				},
				{
					title: translate('navigation.contact.festivalGuestAppearance'),
					href: StaticRoutes.FESTIVAL_GUEST_APPEARANCE_INQUIRY,
					icon: MusicalNoteIcon,
				},
				{
					title: translate('navigation.contact.consulting'),
					href: StaticRoutes.CONSULTING_INQUIRY,
					icon: BriefcaseIcon,
				},
				{
					title: translate('navigation.contact.press'),
					href: StaticRoutes.PRESS_INQUIRY,
					icon: NewspaperIcon,
				},
				{
					title: translate('navigation.contact.support'),
					href: StaticRoutes.SUPPORT_INQUIRY,
					icon: LifebuoyIcon,
				},
			],
		},
	},
];

export interface MainNavigationProps {
	cta?: ContentProviderProps['headerConfiguration']['cta'];
}

export const MainNavigation: FC<MainNavigationProps> = ({ cta }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const translate = useTranslation();
	const items = getMainNavigationTree(translate);

	const handleClose = useCallback(() => {
		setIsExpanded(false);
	}, [setIsExpanded]);

	return (
		<nav role="main" className="flex flex-row flex-nowrap overflow-visible overscroll-auto lg:h-12 lg:mt-2">
			<ul
				className={classNames(
					'transition-all transform-gpu absolute left-0 top-28 w-full overscroll-auto',
					'bg-black border-gray-500 border-t shadow-xl',
					'sm:shadow-none lg:relative lg:visible lg:inline-flex lg:border-t-0 lg:transforms-none lg:left-0 lg:right-0 lg:top-0 lg:bottom-0 lg:transform-none lg:bg-transparent',
					{
						'translate-x-full': !isExpanded,
						'transform-none': isExpanded,
					}
				)}
			>
				{cta && cta.link && (
					<li>
						<div className="px-4 mt-10 mb-4 shadow-2xl lg:shadow-none bg-black sm:hidden sm:pb-0 sm:px-2">
							<Button
								link={{
									href: cta.link,
									iconPositon: 'post',
									icon: <ArrowRightIcon className="inline-block align-text-top h-5 ml-2" />,
								}}
							>
								{cta.title}
							</Button>
						</div>
					</li>
				)}
				{items.map((item) => (
					<li key={item.href} className="p-4 lg:mr-4 lg:p-0">
						<MainNavigationItem {...item} handleClose={handleClose} />
					</li>
				))}
			</ul>
			{/* This CTA should be dynamically controllable via CMS eg. "Festival Tickets" or "Rhema Tickets" */}
			{cta && cta.link && (
				<div className="z-40 invisible hidden sm:inline-flex sm:visible">
					<Button
						link={{
							href: cta.link,
							iconPositon: 'post',
							icon: <ArrowRightIcon className="inline-block align-text-top h-5 ml-2" />,
						}}
					>
						{cta.title}
					</Button>
				</div>
			)}
			<div
				className={classNames('cursor-pointer transition-colors px-2 ml-4 rounded-xl border lg:hidden', {
					'bg-black text-white border-gray-500': !isExpanded,
					'bg-white text-black border-white': isExpanded,
				})}
				onClick={() => {
					setIsExpanded(!isExpanded);
				}}
			>
				{!isExpanded && <Bars3Icon className="inline-block h-10 align-text-top" />}
				{isExpanded && <XMarkIcon className="inline-block h-10 align-text-top" />}
			</div>
		</nav>
	);
};

MainNavigation.displayName = 'MainNavigation';
