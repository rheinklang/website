import classNames from 'classnames';
import { ComponentProps, FC, forwardRef } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from '../hooks/useTranslation';

export interface TextareaProps {
	value?: string;
	rows?: number;
	placeholder?: string;
	hookState?: ControllerFieldState;
	onChange: (value: string) => void;
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ value, rows = 5, hookState, placeholder, icon, onChange }, ref) => {
		const Icon = icon;
		const translate = useTranslation();

		return (
			<div>
				<div className="w-full relative">
					<textarea
						ref={ref}
						rows={rows}
						value={value}
						onChange={(ev) => onChange(ev.target.value)}
						placeholder={placeholder}
						className={classNames(
							'w-full block border-2 placeholder:text-gray-300 border-gray-100 py-2 px-4 rounded-lg bg-gray-50 ring-sea-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
							{
								'pr-6': !!icon,
								'bg-slightly-rose-100 border-slightly-rose-500 text-slightly-rose-900 ring-slightly-rose-200':
									hookState && !!hookState.error,
							}
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

Textarea.displayName = 'Textarea';
