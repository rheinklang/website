import { FC, useMemo } from 'react';
import { useCurrentLiveStreamQuery } from '../graphql';
import { getTwitchPlayerUrl } from '../utils/twitch';
import { ContentConstraint } from './ContentConstraint';
import { Heading } from './Heading';
import { Spinner } from './Spinner';

export const TWITCH_FRAME_ID = 'rheinklang-twitch-player';

export interface TwitchStreamProps {}

export const TwitchStream: FC<TwitchStreamProps> = () => {
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
		<div className="bg-black border-t border-b border-gray-800">
			<ContentConstraint useCustomYSpace>
				<div className="aspect-w-16 aspect-h-9">
					{loading && (
						<div className="w-full h-full flex text-white items-center justify-center">
							<Spinner className="mx-auto" />
						</div>
					)}
					{error && (
						<div className="w-full h-full flex text-white items-center justify-center">
							<Heading level="3">Der Stream konnte nicht geladen werden</Heading>
						</div>
					)}
					{!loading && url && (
						<iframe allowFullScreen id={TWITCH_FRAME_ID} src={url} frameBorder={0} height="100%" />
					)}
				</div>
			</ContentConstraint>
		</div>
	);
};

TwitchStream.displayName = 'TwitchStream';
