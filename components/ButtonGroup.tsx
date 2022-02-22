import classNames from 'classnames';
import { FC } from 'react';

export interface ButtonGroupProps {
	className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ className, children }) => (
	<div className={classNames('flex justify-center flex-col lg:flex-row gap-4', className)}>{children}</div>
);

ButtonGroup.displayName = 'ButtonGroup';
