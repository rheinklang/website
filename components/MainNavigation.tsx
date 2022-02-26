import { FC, useEffect, useState } from 'react';
import {
	ArrowRightIcon,
	BriefcaseIcon,
	FlagIcon,
	InboxIcon,
	MenuIcon,
	SunIcon,
	SupportIcon,
	UserGroupIcon,
	UsersIcon,
	XIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { Button } from './Button';
import { MainNavigationItem, MainNavigationItemProps } from './MainNavigationItem';
import { useTranslation } from '../hooks/useTranslation';
import type { ContentProviderProps } from './utils/ContentProvider';

const getMainNavigationTree = (translate: ReturnType<typeof useTranslation>): MainNavigationItemProps[] => [
	{
		title: translate('navigation.events.title'),
		href: '/events',
		expansion: {
			items: [
				{
					title: translate('navigation.events.festivals'),
					href: '/events/festival',
					icon: FlagIcon,
				},
				{
					title: translate('navigation.events.daydances'),
					href: '/events/daydances',
					icon: SunIcon,
				},
				{
					title: translate('navigation.events.cooperations'),
					href: '/events/cooperations',
					icon: UsersIcon,
				},
			],
		},
	},
	{
		title: translate('navigation.blog.title'),
		href: '/blog',
	},
	{
		title: translate('navigation.about.title'),
		href: '/about-us',
		expansion: {
			items: [
				{
					title: translate('navigation.about.team'),
					href: '/about-us/our-team',
					icon: UserGroupIcon,
				},
				{
					title: translate('navigation.about.title'),
					href: '/about-us/partners-and-sponsors',
					icon: BriefcaseIcon,
				},
			],
		},
	},
	{
		title: translate('navigation.contact.title'),
		href: '/contact',
		expansion: {
			items: [
				{
					title: translate('navigation.contact.eventBooking'),
					href: '/contact/forms/event-booking',
					icon: InboxIcon,
				},
				{
					title: translate('navigation.contact.festivalGuestAppearance'),
					href: '/contact/forms/festival-guest-appearance',
					icon: InboxIcon,
				},
				{
					title: translate('navigation.contact.support'),
					href: '/contact/forms/general-support',
					icon: SupportIcon,
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

	// useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 		if (isExpanded === true) {
	// 			document.body.classList.add('overflow-hidden');
	// 			document.body.classList.add('h-screen');
	// 		} else {
	// 			document.body.classList.remove('overflow-hidden');
	// 			document.body.classList.remove('h-screen');
	// 		}
	// 	}
	// 	console.log('Navigation state change');
	// }, [isExpanded]);

	return (
		<nav role="main" className="flex flex-row flex-nowrap overflow-visible overscroll-auto">
			<ul
				className={classNames(
					'transition-all fixed left-0 bototm-0 top-28 w-full overscroll-auto',
					'bg-black border-gray-500 border-t',
					'lg:relative lg:visible lg:inline-flex lg:border-t-0 lg:transforms-none lg:left-0 lg:right-0 lg:top-0 lg:bottom-0 lg:transform-none lg:bg-transparent',
					{
						'translate-x-full': !isExpanded,
						'transform-none': isExpanded,
					}
				)}
			>
				{items.map((item) => (
					<li key={item.href} className="p-4 lg:mr-4 lg:p-0">
						<MainNavigationItem {...item} />
					</li>
				))}
				{cta && cta.link && (
					<li>
						<div className="px-10 pb-10 mt-10 shadow-2xl lg:shadow-none bg-black sm:hidden sm:pb-0">
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
					console.log('expand menu');
					setIsExpanded(!isExpanded);
				}}
			>
				{!isExpanded && <MenuIcon className="inline-block h-10 align-text-top" />}
				{isExpanded && <XIcon className="inline-block h-10 align-text-top" />}
			</div>
		</nav>
	);
};

MainNavigation.displayName = 'MainNavigation';
