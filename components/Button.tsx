import type { EventHandler, FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { Link, LinkProps } from './Link';
import { RefreshIcon } from '@heroicons/react/outline';

export type ButtonType = 'primary' | 'secondary' | 'black' | 'danger';

export interface ButtonProps {
	type?: ButtonType;
	icon?: JSX.Element;
	id?: string;
	iconPosition?: 'pre' | 'post';
	link?: LinkProps;
	className?: string;
	isDisabled?: boolean;
	isLoading?: boolean;
	onClick?: EventHandler<MouseEvent<HTMLButtonElement>>;
}

// TODO: focus:ring-<color> & focus:ring-offset-<color>
const mapButtonTypeToStyle: Record<ButtonType, string> = {
	primary:
		'bg-sea-green-300 text-sea-green-900 ring-sea-green-200 active:bg-sea-green-300 hover:bg-sea-green-200 hover:text-sea-green-800',
	danger: 'bg-slightly-rose-300 text-slightly-rose-900 ring-slightly-rose-200 active:bg-slightly-rose-300 hover:bg-slightly-rose-200 hover:text-slightly-rose-800',
	secondary: 'bg-gray-100 text-gray-500 ring-sea-green-200 active:bg-gray-300 hover:bg-gray-200 hover:text-gray-800',
	black: 'bg-black text-white ring-sea-green-200 active:bg-gray-700 hover:bg-gray-800 hover:text-gray-100',
};

export const Button: FC<ButtonProps> = ({
	children,
	className,
	icon,
	link,
	id,
	onClick,
	isDisabled = false,
	isLoading = false,
	type = 'primary',
	iconPosition = 'pre',
}) => {
	return (
		<button
			id={id}
			className={classNames(
				`group transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 font-semibold h-12 rounded-lg w-full flex items-center justify-center sm:w-auto`,
				mapButtonTypeToStyle[type],
				className,
				{
					'px-6': !link,
					'cursor-not-allowed opacity-70': isLoading || isDisabled,
				}
			)}
			onClick={(ev) => {
				if (!isLoading && !isDisabled && onClick) {
					onClick(ev);
				}
			}}
		>
			{/* eslint-disable-next-line react/no-children-prop */}
			{link && (
				<Link
					tabIndex={-1}
					className={classNames('block px-6', {
						'cursor-not-allowed': isDisabled,
					})}
					{...link}
					href={isDisabled ? '#' : link.href}
				>
					{children || link.children}
				</Link>
			)}

			{!link && !isLoading && (
				<span className="whitespace-nowrap">
					{icon && iconPosition === 'pre' && icon}
					{children}
					{icon && iconPosition === 'post' && icon}
				</span>
			)}

			{!link && isLoading && <RefreshIcon className="animate-spin h-6" />}
		</button>
	);
};
