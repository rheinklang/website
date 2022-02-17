import { isBrowser } from './ssr';

type MatomoEvent = Record<string, any> | (Record<string, any> & { event: string }) | any;

declare global {
	interface Window {
		_mtm?: MatomoEvent[];
		_paq?: Array<[string] | [string, any]>;
		MatomoTagManager: {
			push: (event: MatomoEvent) => void;
			enableDebugMode: () => void;
			dataLayer: MatomoEvent[];
			debug: {
				enabled: boolean;
				log: (...args: any[]) => void;
			};
		};
	}
}

if (isBrowser) {
	window._paq = window._paq || [];
	window._mtm = window._mtm || [
		{
			'mtm.startTime': new Date().getTime(),
			event: 'mtm.Start',
		},
	];
}

export const tagManagerPush = (event: MatomoEvent) => {
	if (!isBrowser) {
		return;
	}

	if (!window._mtm) {
		window._mtm = [];
	}

	console.log('tagManagerPush', event);
	window._mtm.push(event);
};

export const matomoPush = (event: [string] | [string, any]) => {
	if (!isBrowser) {
		return;
	}

	if (!window._paq) {
		window._paq = [];
	}

	console.log('matomoPush', event);
	window._paq.push(event);
};

export const setTrackingConsent = (enabled = false) => {
	if (enabled) {
		matomoPush(['rememberConsentGiven']);
	} else {
		// TODO: Clarify how to revoke consent
	}
};
