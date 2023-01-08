import { ArrowUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, useCallback } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';

export const ScrollTop: FC = () => {
	const scrollPosition = useScrollPosition();

	const handleScrollTop = useCallback(() => {
		window.scrollTo({
			behavior: 'smooth',
			top: 0,
		});
	}, []);

	return (
		<button
			type="button"
			className={classNames(
				'bg-slightly-rose-500 text-white rounded-full w-7 h-7 fixed right-5 bottom-5 shadow-2xl',
				'transition-all duration-500',
				'hover:bg-slightly-rose-400',
				{
					'invisible opacity-0': scrollPosition <= 300,
					'visible opacity-100': scrollPosition > 300,
				}
			)}
			onClick={handleScrollTop}
		>
			<ArrowUpIcon className="h-5 inline-block" />
		</button>
	);
};

ScrollTop.displayName = 'ScrollTop';
