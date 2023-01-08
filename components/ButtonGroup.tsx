import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

export interface ButtonGroupProps extends PropsWithChildren {
	className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ className, children }) => (
	<div className={classNames('flex justify-center flex-col md:flex-row gap-4', className)}>{children}</div>
);

ButtonGroup.displayName = 'ButtonGroup';
