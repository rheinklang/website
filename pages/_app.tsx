import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { cmsDataFetcher, localStorageCacheProvider } from '../utils/swr';
import { Matomo } from '../components/utils/Matomo';

import '../styles/globals.css';

function RheinklangApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Rheinklang</title>
			</Head>
			<SWRConfig value={{ provider: localStorageCacheProvider, fetcher: cmsDataFetcher }}>
				<Component {...pageProps} />
			</SWRConfig>
			<Matomo />
		</>
	);
}

export default RheinklangApp;
