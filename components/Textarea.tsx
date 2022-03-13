import classNames from 'classnames';
import { ComponentProps, FC, forwardRef } from 'react';

export interface TextareaProps {
	value?: string;
	rows?: number;
	placeholder?: string;
	onChange: (value: string) => void;
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ value, rows = 5, placeholder, icon, onChange }, ref) => {
		const Icon = icon;

		return (
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
	}
);

Textarea.displayName = 'Textarea';
