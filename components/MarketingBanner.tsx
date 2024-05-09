'use client';

import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { storage } from '../utils/localstorage';
import { ContentConstraint } from './ContentConstraint';
import { Link } from './Link';
import posthog from 'posthog-js';

export interface MarketingBannerProps {
	id?: string;
	link?: string | null;
	message?: string | null;
}

const MARKETING_BANNER_STORAGE_KEY = 'marketingBannerState' as const;

export const MarketingBanner: FC<MarketingBannerProps> = ({ id, message, link }) => {
	const translate = useTranslation();
	const [isInitialized, setIsInitialized] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);

	const handleDismiss = useCallback(() => {
		storage.set(`${MARKETING_BANNER_STORAGE_KEY}.${id}`, true);
		setIsDismissed(true);

		posthog.capture('Marketing Banner Dismissed', {
			id,
		});
	}, [id, setIsDismissed]);

	useEffect(() => {
		setIsInitialized(true);
		setIsDismissed(storage.get(`${MARKETING_BANNER_STORAGE_KEY}.${id}`) === true);
	}, [id]);

	if (!isInitialized || isDismissed) {
		// If we're on the server or the user already dismissed the banner
		return null;
	}

	if (!id || !message) {
		// No valid content available, skip rendering
		return null;
	}

	return (
		<article role="banner" className="bg-slightly-rose-400 text-slightly-rose-900">
			<ContentConstraint useCustomYSpace className="flex flex-row justify-between px-2 py-4 flex-nowrap lg:py-2">
				<div className="flex flex-col items-center justify-center flex-grow-0 p-2 mr-2 bg-white rounded-lg bg-opacity-20">
					<MegaphoneIcon className="h-4 text-slightly-rose-600" />
				</div>
				<p className="my-2 mr-2 text-sm lg:mr-auto">
					{message}
					{link && (
						<span
							onClick={() => {
								posthog.capture('Marketing Banner Clicked', {
									id,
								});
							}}
						>
							&nbsp;–&nbsp;
							<Link className="w-auto text-sm underline" href={link} title={message}>
								{translate('common.action.learnMore')}
							</Link>
						</span>
					)}
				</p>

				<div className="flex flex-col items-center justify-center flex-grow-0 w-6">
					<XMarkIcon className="h-4 cursor-pointer" onClick={handleDismiss} />
				</div>
			</ContentConstraint>
		</article>
	);
};

MarketingBanner.displayName = 'MarketingBanner';
