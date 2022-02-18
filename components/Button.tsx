import type { EventHandler, FC, MouseEvent } from 'react';
import classNames from 'classnames';
import { Link, LinkProps } from './Link';

export type ButtonType = 'primary' | 'secondary' | 'black';

export interface ButtonProps {
	type?: ButtonType;
	icon?: JSX.Element;
	iconPosition?: 'pre' | 'post';
	link?: LinkProps;
	className?: string;
	onClick?: EventHandler<MouseEvent<HTMLButtonElement>>;
}

// TODO: focus:ring-<color> & focus:ring-offset-<color>
const mapButtonTypeToStyle: Record<ButtonType, string> = {
	primary: 'bg-sea-green-300 text-sea-green-900 hover:bg-sea-green-200 hover:text-sea-green-800',
	secondary: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800',
	black: 'bg-black text-white hover:bg-gray-900 hover:text-gray-100',
};

export const Button: FC<ButtonProps> = ({
	children,
	className,
	icon,
	link,
	type = 'primary',
	iconPosition = 'pre',
}) => {
	return (
		<button
			className={classNames(
				`transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto`,
				mapButtonTypeToStyle[type],
				className
			)}
		>
			{link && <Link className="block" {...link} />}
			{!link && (
				<span className="whitespace-nowrap">
					{icon && iconPosition === 'pre' && icon}
					{children}
					{icon && iconPosition === 'post' && icon}
				</span>
			)}
		</button>
	);
};
