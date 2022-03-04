import classNames from 'classnames';
import { FC } from 'react';
import { ContentConstraint } from './ContentConstraint';
import { Heading } from './Heading';

export interface ContentHeaderProps {
	title: JSX.Element | string;
	text?: JSX.Element | string;
	className?: string;
}

export const ContentHeader: FC<ContentHeaderProps> = ({ title, text, children, className }) => {
	return (
		<div className={classNames('py-4 bg-white border-b sm:py-6 lg:py-8', className)}>
			<ContentConstraint className="flex flex-wrap sm:flex-nowrap">
				<div
					className={classNames('flex flex-col text-center sm:w-1/2 sm:pr-4 sm:text-left', {
						'w-full': !children,
					})}
				>
					<Heading level="1">{title}</Heading>
					<p className="mt-1 text-xl lg:text-2xl font-light">{text}</p>
				</div>
				{children && (
					<div className="flex flex-col w-full mt-6 sm:mt-0 sm:ml-auto sm:w-1/2 md:w-auto">{children}</div>
				)}
			</ContentConstraint>
		</div>
	);
};
