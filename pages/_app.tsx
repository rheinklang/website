import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { appleDeviceSpecsForLaunchImages } from '../utils/pwa-asset-generator-specs';
import { Fragment, useEffect } from 'react';
import { JsonLd } from '../components/utils/JsonLd';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';

const interFont = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

const StagingIndicator = dynamic(() =>
	import(/* webpackChunkName: "staging-indicator-component" */ '../components/StagingIndicator').then(
		(mod) => mod.StagingIndicator
	)
);

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
		// Enable debug mode in development
		loaded: (posthog) => {
			if (process.env.NODE_ENV === 'development') posthog.debug();
		},
	});
}

// See https://fontawesome.com/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false;

function RheinklangApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => posthog?.capture('$pageview');
		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="IE=edge" />
				<meta httpEquiv="content-type" content="text/html; charset=utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no" />
				<meta
					key="seo-description"
					name="description"
					content="Rheinklang, Events für elektronische Musik im St. Galler Rheintal"
				/>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* OG Defaults */}
				<meta key="og-type" property="og:type" content="website" />
				<meta property="og:locale" content="de_CH" />
				<meta property="og:site_name" content="Rheinklang" />
				<meta name="twitter:card" content="summary_large_image" />
				{/* PWA Contents */}
				<meta name="theme-color" content="#000000" />
				<meta name="apple-mobile-web-app-title" content="Rheinklang" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				{appleDeviceSpecsForLaunchImages.map((spec) => (
					<Fragment key={`${spec.portrait.width}-${spec.portrait.height}`}>
						<link
							rel="apple-touch-startup-image"
							href={`/assets/pwa/splash/apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
							media={`(device-width: ${spec.portrait.width / spec.scaleFactor}px) and (device-height: ${
								spec.portrait.height / spec.scaleFactor
							}px) and (-webkit-device-pixel-ratio: ${spec.scaleFactor}) and (orientation: portrait)`}
						/>
						<link
							rel="apple-touch-startup-image"
							href={`/assets/pwa/splash/apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
							media={`(device-width: ${spec.portrait.height / spec.scaleFactor}px) and (device-height: ${
								spec.portrait.width / spec.scaleFactor
							}px) and (-webkit-device-pixel-ratio: ${spec.scaleFactor}) and (orientation: landscape)`}
						/>
					</Fragment>
				))}
				{/* JSON+LD structured data */}
				<JsonLd
					schema={{
						'@type': 'WebSite',
						name: 'Rheinklang',
						url: 'https://rheinklang.events/',
					}}
				/>
				<JsonLd
					schema={{
						'@type': 'Organization',
						url: 'https://rheinklang.events',
						logo: 'https://rheinklang.events/assets/logos/logo.png',
					}}
				/>
			</Head>
			<div className={`${interFont.variable} ${interFont.className} bg-white`}>
				<PostHogProvider client={posthog}>
					<Component {...pageProps} />
				</PostHogProvider>
			</div>
			{process.env.NEXT_PUBLIC_ENABLE_STAGING_INDICATOR && <StagingIndicator />}
		</>
	);
}

export default RheinklangApp;
