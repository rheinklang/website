import classNames from 'classnames';
import type { FC } from 'react';

export type BadgeType = 'primary' | 'secondary';

export interface BadgeProps {
	type?: BadgeType;
	className?: string;
}

export const mapBadgeTypeToClass: Record<BadgeType, string> = {
	primary: 'bg-sea-green-100 text-sea-green-500',
	secondary: 'bg-gray-100 text-gray-500',
};

export const Badge: FC<BadgeProps> = ({ children, type = 'primary', className }) => (
	<span
		className={classNames(
			'inline-block py-1 px-2 rounded  text-xs font-medium tracking-widest',
			mapBadgeTypeToClass[type],
			className
		)}
	>
		{children}
	</span>
);

Badge.displayName = 'Badge';
