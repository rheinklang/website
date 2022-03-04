import { ComponentProps, FC, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

export interface DropdownOption {
	id: string;
	label: string;
	disabled?: boolean;
}

export interface DropdownProps {
	placeholder: string;
	value?: string;
	options?: DropdownOption[];
	onChange: (value: string | undefined) => void;
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Dropdown: FC<DropdownProps> = ({ placeholder, value, onChange, options = [], icon }) => {
	const Icon = icon || SelectorIcon;
	const activeLabel = options.find((option) => option.id === value)?.label;

	return (
		<Listbox value={value} onChange={(val) => onChange(val)}>
			<div className="relative w-full">
				<Listbox.Button className="w-full h-12 border-2 text-left border-gray-100 py-2 px-4 rounded-lg bg-gray-50/50 ring-sea-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
					<span
						className={classNames('block truncate', {
							'text-gray-300': !value,
							'pr-6': !!icon,
						})}
					>
						{activeLabel || placeholder}
					</span>
					<span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
						<Icon className="w-5 h-5 text-gray-300" aria-hidden="true" />
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{options.map((option) => (
							<Listbox.Option
								key={option.id}
								value={option.id}
								disabled={!!option.disabled}
								className={({ active, disabled }) =>
									classNames(`cursor-pointer select-none relative py-2 pl-10 pr-4`, {
										'text-sea-green-400': active,
										'text-gray-400': disabled,
									})
								}
							>
								{({ selected }) => (
									<>
										<span>{option.label}</span>
										{selected && (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sea-green-400">
												<CheckIcon className="w-5 h-5" aria-hidden="true" />
											</span>
										)}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

Dropdown.displayName = 'Dropdown';
