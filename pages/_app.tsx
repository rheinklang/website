import type { AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/fonts.css';
import '../styles/globals.css';

// See https://fontawesome.com/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false;

function RheinklangApp({ Component, pageProps }: AppProps) {
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
				<link rel="icon" type="image/png" href="/favicon-corporate.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta name="apple-mobile-web-app-title" content="Rheinklang" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="de_CH" />
				<meta property="og:site_name" content="Rheinklang" />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<div className="bg-white overflow-x-hidden">
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default RheinklangApp;
