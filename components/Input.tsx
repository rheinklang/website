import classNames from 'classnames';
import { ComponentProps, FC, forwardRef, HTMLInputTypeAttribute } from 'react';

export interface InputProps {
	value?: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	onChange: (value: string) => void;
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ value, type, placeholder, icon, onChange }, ref) => {
	const Icon = icon;

	return (
		<div className="w-full relative">
			<input
				ref={ref}
				type={type}
				value={value}
				onChange={(ev) => onChange(ev.target.value)}
				placeholder={placeholder}
				className={classNames(
					'w-full block truncate h-12 border-2 placeholder:text-gray-300 border-gray-100 py-2 px-4 rounded-lg bg-gray-50 ring-sea-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
					{
						'pr-6': !!icon,
					}
				)}
			/>
			{Icon && (
				<span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<Icon className="w-5 h-5 text-gray-300" aria-hidden="true" />
				</span>
			)}
		</div>
	);
});

Input.displayName = 'Input';
