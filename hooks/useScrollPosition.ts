import { useCallback, useEffect, useState } from 'react';

export const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleOnScroll = useCallback(() => {
		requestAnimationFrame(() => setScrollPosition(window.pageYOffset));
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleOnScroll, {
			passive: true,
		});

		return () => window.removeEventListener('scroll', handleOnScroll);
	}, [handleOnScroll]);

	return scrollPosition;
};
