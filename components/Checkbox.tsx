import classNames from 'classnames';
import type { FC } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { useTranslation } from '../hooks/useTranslation';

export interface CheckboxProps {
	id: string;
	title: string;
	value?: boolean;
	isRequired?: boolean;
	isDisabled?: boolean;
	hookState?: ControllerFieldState;
	onChange: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ id, title, value, onChange, hookState, isRequired, isDisabled }) => {
	const translate = useTranslation();

	return (
		<label className="flex items-center space-x-3 mb-3" htmlFor={id}>
			<input
				checked={value}
				onChange={() => onChange(!value)}
				type="checkbox"
				name={id}
				id={id}
				className={classNames(
					'form-checkbox cursor-pointer rounded-md h-5 w-5 p-1 border-2 border-gray-300 text-sea-green-500 focus:ring-sea-green-500 disabled:bg-sea-green-300 disabled:hover:bg-sea-green-300 disabled:cursor-not-allowed',
					{
						'border-slightly-rose-600': hookState && !!hookState.error,
					}
				)}
				disabled={isDisabled}
				aria-disabled={isDisabled}
				required={!!isRequired}
				aria-required={!!isRequired}
			/>
			<span className={classNames('text-gray-700 dark:text-white font-normal')}>
				{title}
				{!!isRequired && <span className="text-xs align-top uppercase text-slightly-rose-500 ml-1">*</span>}
			</span>
		</label>
	);
};

Checkbox.displayName = 'Checkbox';
