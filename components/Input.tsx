import classNames from 'classnames';
import { ComponentProps, FC, forwardRef, HTMLInputTypeAttribute } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from '../hooks/useTranslation';

export interface InputProps {
	value?: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	isDisabled?: boolean;
	className?: string;
	hookState?: ControllerFieldState;
	onChange: (value: string) => void;
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ isDisabled, value, type, placeholder, icon, onChange, className, hookState }, ref) => {
		const Icon = icon;
		const translate = useTranslation();

		return (
			<div>
				<div className="w-full relative">
					<input
						disabled={isDisabled}
						ref={ref}
						type={type}
						value={value}
						onChange={(ev) => {
							if (isDisabled) {
								return;
							}

							onChange(ev.target.value);
						}}
						placeholder={placeholder}
						className={classNames(
							'w-full block truncate h-12 border-2 placeholder:text-gray-300 border-gray-100 py-2 px-4 rounded-lg bg-gray-50 ring-sea-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
							{
								'pr-6': !!icon,
								'text-gray-400 cursor-not-allowed': isDisabled,
								'bg-slightly-rose-100 border-slightly-rose-500 text-slightly-rose-900':
									hookState && !!hookState.error,
							},
							className
						)}
					/>
					{Icon && (
						<span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<Icon className="w-5 h-5 text-gray-300" aria-hidden="true" />
						</span>
					)}
				</div>
				{hookState && hookState.error && (
					<p className="text-xs mt-1 text-slightly-rose-700">
						{translate(`forms.error.${hookState.error.type}`)}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';
