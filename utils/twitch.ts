export const TWITCH_PLAYER_URL = 'https://player.twitch.tv' as const;

/**
 * @see https://dev.twitch.tv/docs/embed/video-and-clips
 */
const twitchPlayerParams = new URLSearchParams();
twitchPlayerParams.set('channel', 'rheinklang');

if (process.env.NODE_ENV === 'development') {
	twitchPlayerParams.set('muted', 'true');
	twitchPlayerParams.append('parent', 'localhost');
}

if (process.env.NODE_ENV === 'production') {
	twitchPlayerParams.append('parent', 'rheinklang-festival.ch');
}

export const getTwitchPlayerUrl = (
	channelOrVideoOrCollection: string,
	embedType: 'video' | 'collection' | 'channel' = 'channel'
): string => {
	return `${TWITCH_PLAYER_URL}/?${embedType}=${channelOrVideoOrCollection}&${twitchPlayerParams.toString()}`;
};
