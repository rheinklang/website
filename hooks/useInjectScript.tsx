import { useEffect } from 'react';

export interface UseInjectScriptOptions {
	async?: boolean;
	defer?: boolean;
}

export const useInjectScript = (url: string, options: UseInjectScriptOptions = {}) => {
	useEffect(() => {
		const script = document.createElement('script');

		script.src = url;
		script.async = options.async || true;
		script.defer = options.defer || false;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, [url, options]);
};
