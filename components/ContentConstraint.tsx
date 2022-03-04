import classNames from 'classnames';
import { FC } from 'react';

interface ContentConstraintProps {
	tag?: string;
	useCustomYSpace?: boolean;
	className?: string;
}

export const ContentConstraint: FC<ContentConstraintProps> = ({
	children,
	useCustomYSpace = false,
	className,
	tag = 'div',
}) => {
	const Tag = tag as 'div';

	return (
		<Tag
			className={classNames('container px-4 items-center mx-auto', className, {
				'py-8': !useCustomYSpace,
			})}
		>
			{children}
		</Tag>
	);
};

ContentConstraint.displayName = 'ContentConstraint';
