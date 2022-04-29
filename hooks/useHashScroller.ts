import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useHashScroller = (debouncedOffset = 100) => {
	const { asPath } = useRouter();

	useEffect(() => {
		if (window && document) {
			const currentUrlHash = window.location.hash;
			if (currentUrlHash) {
				const tid = setTimeout(() => {
					const targetElement = document.querySelector(currentUrlHash);
					if (targetElement) {
						targetElement.scrollIntoView({ behavior: 'smooth' });
					}
				}, debouncedOffset);

				return () => clearTimeout(tid);
			}
		}
	}, [debouncedOffset, asPath]);
};
