import type { FC } from 'react';

export interface CheckboxProps {
	id: string;
	title: string;
	isRequired?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ id, title, isRequired }) => {
	return (
		<label className="flex items-center space-x-3 mb-3" htmlFor={id}>
			<input
				type="checkbox"
				name={id}
				className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-sea-green-500 checked:border-transparent focus:outline-none"
				required={isRequired}
				aria-required={isRequired}
			/>
			<span className="text-gray-700 dark:text-white font-normal">{title}</span>
		</label>
	);
};

Checkbox.displayName = 'Checkbox';
