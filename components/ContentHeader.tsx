import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import { ContentConstraint } from './ContentConstraint';
import { Heading } from './Heading';

export interface ContentHeaderProps extends PropsWithChildren {
	title: JSX.Element | string;
	text?: JSX.Element | string;
	className?: string;
	constraintClassName?: string;
}

export const ContentHeader: FC<ContentHeaderProps> = ({ title, text, children, className, constraintClassName }) => {
	return (
		<div className={classNames('py-4 bg-white border-b border-gray-100 sm:py-6 lg:py-8', className)}>
			<ContentConstraint className={classNames('flex flex-wrap sm:flex-nowrap', constraintClassName)}>
				<div
					className={classNames(
						'flex flex-col basis-full text-center sm:basis-2/3 sm:pr-4 sm:text-left lg:basis-3/4',
						{
							'w-full': !children,
						}
					)}
				>
					<Heading level="1">{title}</Heading>
					<p className="mt-1 text-xl lg:text-2xl font-light">{text}</p>
				</div>
				{children && (
					<div className="flex flex-col basis-full mt-6 sm:mt-0 sm:ml-auto sm:basis-1/3 lg:basis-1/4">
						{children}
					</div>
				)}
			</ContentConstraint>
		</div>
	);
};
