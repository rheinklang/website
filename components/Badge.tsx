import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

export type BadgeType = 'primary' | 'secondary';

export interface BadgeProps extends PropsWithChildren {
	type?: BadgeType;
	isUppercase?: boolean;
	className?: string;
}

export const mapBadgeTypeToClass: Record<BadgeType, string> = {
	primary: 'bg-sea-green-100 text-sea-green-500',
	secondary: 'bg-gray-100 text-gray-500',
};

export const Badge: FC<BadgeProps> = ({ children, isUppercase = true, type = 'primary', className }) => (
	<span
		className={classNames(
			'inline-block w-fit py-1 px-2 rounded  text-xs font-medium tracking-widest',
			mapBadgeTypeToClass[type],
			{
				uppercase: isUppercase,
			},
			className
		)}
	>
		{children}
	</span>
);

Badge.displayName = 'Badge';
