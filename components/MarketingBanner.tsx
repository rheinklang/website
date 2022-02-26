import { ArrowRightIcon, SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import { FC, useCallback, useEffect, useState } from 'react';
import { storage } from '../utils/localstorage';
import { Button } from './Button';
import { ContentConstraint } from './ContentConstraint';
import { Link } from './Link';

export interface MarketingBannerProps {
	id?: string;
	text?: string | null;
	link?: string | null;
}

const MARKETING_BANNER_STORAGE_KEY = 'marketingBannerState' as const;

export const MarketingBanner: FC<MarketingBannerProps> = ({ id, text, link }) => {
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
			<ContentConstraint useCustomYSpace className="flex flex-row flex-nowrap justify-between py-4 px-2 lg:py-2">
				<div className="bg-white bg-opacity-20 rounded-lg flex flex-col justify-center items-center p-2 mr-2 flex-grow-0">
					<SpeakerphoneIcon className="text-slightly-rose-600 h-4" />
				</div>
				<p className="my-2 mr-2 lg:mr-auto text-sm">
					{text}
					{link && (
						<span>
							&nbsp;–&nbsp;
							<Link className="w-auto underline text-sm" href={link} title={text}>
								Mehr dazu
							</Link>
						</span>
					)}
				</p>

				<div className="w-6 flex flex-col flex-grow-0 justify-center items-center">
					<XIcon className="cursor-pointer h-4" onClick={handleDismiss} />
				</div>
			</ContentConstraint>
		</article>
	);
};

MarketingBanner.displayName = 'MarketingBanner';
