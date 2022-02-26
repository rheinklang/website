import { TagIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { ComponentProps, createRef, FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button } from './Button';

interface DropdownOptionProps {
	id: string;
	title: string;
	isActive?: boolean;
}

const DropdownOption: FC<DropdownOptionProps> = ({ id, title, isActive = false }) => {
	return (
		<div
			className={classNames(
				'block cursor-pointer px-4 py-2 text-md border-b border-gray-100',
				'first:rounded-t-md last:rounded-b-md last:border-b-0',
				{
					'text-gray-700 hover:bg-gray-100 hover:text-gray-900': !isActive,
					'cursor-auto bg-gray-50 text-gray-400': isActive,
				}
			)}
			role="menuitem"
		>
			<span className="flex flex-col">
				<span>{title}</span>
			</span>
		</div>
	);
};

DropdownOption.displayName = 'DropdownOption';

export interface DropdownProps {
	placeholder: string;
	icon?: (props: ComponentProps<'svg'>) => JSX.Element;
}

export const Dropdown: FC<DropdownProps> = ({ placeholder, icon }) => {
	const dropdownOptionsListRef = createRef<HTMLDivElement>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const Icon = icon;

	return (
		<div className="grow relative inline-block text-left">
			<div>
				<Button
					id="options-menu"
					type="black"
					iconPosition="pre"
					icon={Icon && <Icon className="inline-block h-4 mr-2" />}
					onClick={() => setIsOpen(!isOpen)}
				>
					{placeholder}
				</Button>
				<CSSTransition timeout={300} nodeRef={dropdownOptionsListRef}>
					<div
						className={classNames(
							'transitions-all origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white shadow-2xl border border-gray-100',
							{
								'invisible opacity-0': !isOpen,
								'visible opacity-100': isOpen,
							}
						)}
						ref={dropdownOptionsListRef}
					>
						<div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<DropdownOption id="stipe" title="XYZ" />
							<DropdownOption isActive id="mastercard" title="Something Else" />
							<DropdownOption id="paypal" title="And another one ..." />
						</div>
					</div>
				</CSSTransition>
			</div>
		</div>
	);
};

Dropdown.displayName = 'Dropdown';
