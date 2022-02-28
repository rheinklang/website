import type { AppProps } from 'next/app';
import Head from 'next/head';
// import { inMemoryCache } from '../graphql';
// import { ApolloCacheContext } from '../hooks/useApolloCache';
import '../styles/globals.css';

function RheinklangApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>Rheinklang</title>
				<meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no" />
				<meta name="description" content="Rheinklang, Events für elektronische Musik im St. Galler Rheintal" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="bg-white overflow-x-hidden">
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default RheinklangApp;
