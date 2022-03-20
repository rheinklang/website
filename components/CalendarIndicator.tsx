import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { formatDate } from '../utils/date';

export interface CalendarIndicatorProps {
	date: string;
	className?: string;
}

export const CalendarIndicator: FC<CalendarIndicatorProps> = ({ date, className }) => {
	const month = useMemo(() => formatDate(date, 'MMMM'), [date]);
	const day = useMemo(() => formatDate(date, 'dd'), [date]);
	const year = useMemo(() => formatDate(date, 'yyyy'), [date]);

	return (
		<aside className={classNames('rounded-xl bg-white border-4 border-white w-24', className)}>
			<data value={date} className="text-center justify-center">
				<p className="text-4xl font-bold p-4">{day}</p>
				<p className="bg-black text-gray-50 tracking-wide font-semibold py-0.5 text-xs uppercase ">{month}</p>
				<p className="bg-slightly-rose-500 text-slightly-rose-800 rounded-b-xl text-xs tracking-tighter">
					{year}
				</p>
			</data>
		</aside>
	);
};

CalendarIndicator.displayName = 'CalendarIndicator';
