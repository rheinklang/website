'use client';

import { FC, useMemo } from 'react';
import { useCurrentLiveStreamQuery } from '../graphql';
import { useTranslation } from '../hooks/useTranslation';
import { getTwitchPlayerUrl } from '../utils/twitch';
import { ContentConstraint } from './ContentConstraint';
import { ErrorPage } from './ErrorPage';
import { Heading } from './Heading';
import { Spinner } from './Spinner';

export const TWITCH_FRAME_ID = 'rheinklang-twitch-player';

export interface TwitchStreamProps {}

export const TwitchStream: FC<TwitchStreamProps> = () => {
	const translate = useTranslation();
	const { data, loading, error } = useCurrentLiveStreamQuery();

	const twitchAccount = useMemo(
		() => (data ? data.livestreamConfigurationSingleton.twitchAccount : undefined),
		[data]
	);

	const url = useMemo(
		() => (twitchAccount ? getTwitchPlayerUrl(twitchAccount, 'channel') : undefined),
		[twitchAccount]
	);

	return (
		<div className="bg-black text-white">
			<ContentConstraint useCustomYSpace>
				<div
					className={
						!loading && url && data && data.livestreamConfigurationSingleton.isEnabled
							? 'aspect-w-16 aspect-h-9'
							: 'min-h-[50vh]'
					}
				>
					{loading && (
						<div className="w-full h-full flex text-white items-center justify-center">
							<Spinner className="inline-block" />
						</div>
					)}
					{!loading && data && !data.livestreamConfigurationSingleton.isEnabled && (
						<ErrorPage
							statusCode={404}
							title={translate('error.livestream.noStreamTitle')}
							message={translate('error.livestream.noStreamText')}
						/>
					)}
					{!loading && error && (
						<div className="w-full h-full flex text-white items-center justify-center">
							<Heading level="3">Der Stream konnte nicht geladen werden</Heading>
						</div>
					)}
					{!loading && url && data && data.livestreamConfigurationSingleton.isEnabled && (
						<iframe
							allowFullScreen
							id={TWITCH_FRAME_ID}
							src={url}
							frameBorder={0}
							allow="fullscreen"
							height="100%"
						/>
					)}
				</div>
			</ContentConstraint>
		</div>
	);
};

TwitchStream.displayName = 'TwitchStream';
