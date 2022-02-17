import Router from 'next/router';
import { FC, memo } from 'react';
import { tagManagerPush } from '../../utils/matomo';
// import { push, pushInitialEvents, trackPageView } from '../../utils/matomo';
import { isBrowser } from '../../utils/ssr';

const MATOMO_SCRIPT_ID = `matomo-tracker-injection` as const;

let matomoIntegrationStatus: 'idle' | 'initializing' | 'ready' = 'idle';

const injectMatomoContainerScript = () => {
	if (document.getElementById(MATOMO_SCRIPT_ID)) {
		return;
	}

	const refElement = document.getElementsByTagName('script')[0];
	const scriptElement = document.createElement('script');

	scriptElement.id = MATOMO_SCRIPT_ID;
	scriptElement.type = 'text/javascript';
	scriptElement.async = true;
	scriptElement.src = `${process.env.NEXT_PUBLIC_MATOMO_URL}/js/container_${process.env.NEXT_PUBLIC_MATOMO_CONTAINER_ID}.js`;

	if (refElement.parentNode) {
		refElement.parentNode.insertBefore(scriptElement, refElement);
	}
};

export const Matomo: FC = memo(() => {
	if (!isBrowser) {
		// Abort Matomo integration during SSR
		return null;
	}

	if (matomoIntegrationStatus !== 'idle') {
		// Do not initialize twice
		return null;
	}

	console.log('Render Matomo');
	matomoIntegrationStatus = 'initializing';

	// Inject the main embed script for the container
	injectMatomoContainerScript();

	Router.events.on('routeChangeComplete', () => {
		// Push custom event to initialize Facebook Pixel and Piwik
		tagManagerPush({
			event: 'applicationReady',
		});

		// In order to ensure that the page title had been updated,
		// we delayed pushing the tracking to the next tick.
		const trackerDelayTimeout = setTimeout(() => {
			tagManagerPush({
				event: 'mtm.PageView',
			});
			clearTimeout(trackerDelayTimeout);
		}, 0);

		// Set status to "ready"
		matomoIntegrationStatus = 'ready';
	});

	return null;
});

Matomo.displayName = 'Matomo';
