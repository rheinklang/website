import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/fonts.css';
import '../styles/globals.css';

function RheinklangApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no" />
				<meta
					key="seo-description"
					name="description"
					content="Rheinklang, Events für elektronische Musik im St. Galler Rheintal"
				/>
				<link rel="icon" type="image/png" href="/favicon.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="de_CH" />
				<meta property="og:site_name" content="Rheinklang" />
			</Head>
			<div className="bg-white overflow-x-hidden">
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default RheinklangApp;
