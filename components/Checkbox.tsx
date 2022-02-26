import type { FC } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface CheckboxProps {
	id: string;
	title: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	register: UseFormRegister<any>;
	options?: RegisterOptions;
}

export const Checkbox: FC<CheckboxProps> = ({ id, title, options = {}, isRequired, isDisabled, register }) => {
	return (
		<label className="flex items-center space-x-3 mb-3" htmlFor={id}>
			<input
				{...register(id)}
				type="checkbox"
				name={id}
				id={id}
				className="form-checkbox cursor-pointer rounded-md h-5 w-5 p-1 border-gray-300 text-sea-green-500 focus:ring-sea-green-500 disabled:bg-sea-green-300 disabled:hover:bg-sea-green-300 disabled:cursor-not-allowed"
				disabled={options.disabled}
				aria-disabled={options.disabled}
				required={!!options.required}
				aria-required={!!options.required}
			/>
			<span className="text-gray-700 dark:text-white font-normal">
				{title}
				{!!options.required && (
					<span className="text-xs align-top uppercase text-slightly-rose-500 ml-1">*</span>
				)}
			</span>
		</label>
	);
};

Checkbox.displayName = 'Checkbox';
