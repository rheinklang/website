import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { formatDate } from '../utils/date';

export interface CalendarIndicatorProps {
	date: string;
	className?: string;
}

export const CalendarIndicator: FC<CalendarIndicatorProps> = ({ date, className }) => {
	const month = useMemo(() => formatDate(date, 'MMMM'), [date]);
	const day = useMemo(() => formatDate(date, 'd'), [date]);
	const year = useMemo(() => formatDate(date, 'yyyy'), [date]);

	return (
		<aside className={classNames('rounded-xl bg-white w-24 lg:w-32', className)}>
			<data value={date} className="text-center justify-center">
				<p className="text-4xl lg:text-6xl font-bold py-5">{day}</p>
				<p className="bg-black text-gray-50 uppercase tracking-wider font-semibold py-0.5 text-xs lg:text-base lg:py-1">
					{month}
				</p>
				<p className="bg-slightly-rose-500 text-slightly-rose-800 rounded-b-xl text-xs lg:text-sm tracking-tighter">
					{year}
				</p>
			</data>
		</aside>
	);
};

CalendarIndicator.displayName = 'CalendarIndicator';
