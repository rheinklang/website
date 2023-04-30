import { useMemo } from 'react';

type PWAMode = 'browser' | 'app';

export const usePWA = () => {
	const safeWindow = useMemo(() => (typeof window === 'undefined' ? null : window), [window]);
	const displayMode = useMemo(
		(): PWAMode => (safeWindow && safeWindow.matchMedia('(display-mode: standalone)').matches ? 'app' : 'browser'),
		[safeWindow]
	);

	return {
		isInAppMode: displayMode === 'app',
	};
};
