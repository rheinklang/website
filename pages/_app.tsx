import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { cmsDataFetcher, localStorageCacheProvider } from '../utils/swr';

function RheinklangApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig value={{ provider: localStorageCacheProvider, fetcher: cmsDataFetcher }}>
			<Component {...pageProps} />
		</SWRConfig>
	);
}

export default RheinklangApp;
