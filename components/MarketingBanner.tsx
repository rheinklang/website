import { XIcon } from '@heroicons/react/outline';
import { FC, useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/localstorage';
import { ContentConstraint } from './ContentConstraint';

export interface MarketingBannerProps {
	id?: string;
	text?: string;
}

const MARKETING_BANNER_STORAGE_KEY = 'marketingBannerState' as const;

export const MarketingBanner: FC<MarketingBannerProps> = ({ id, text }) => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);

	const handleDismiss = useCallback(() => {
		storage.set(`${MARKETING_BANNER_STORAGE_KEY}.${id}`, true);
		setIsDismissed(true);
		// TODO: Add tracking
	}, [id, setIsDismissed]);

	useEffect(() => {
		setIsInitialized(true);
		setIsDismissed(storage.get(`${MARKETING_BANNER_STORAGE_KEY}.${id}`) === true);
	}, [id]);

	if (!isInitialized || isDismissed) {
		// If we're on the server or the user already dismissed the banner
		return null;
	}

	if (!id || !text) {
		// No valid content available, skip rendering
		return null;
	}

	return (
		<article role="banner" className="bg-slightly-rose-400 text-slightly-rose-900">
			<ContentConstraint className="flex flex-row flex-nowrap justify-between py-2">
				<p>{text}</p>
				<XIcon className="cursor-pointer h-6 lg:h-6" onClick={handleDismiss} />
			</ContentConstraint>
		</article>
	);
};

MarketingBanner.displayName = 'MarketingBanner';
