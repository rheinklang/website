import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

interface ContentConstraintProps extends PropsWithChildren {
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
			className={classNames('container px-4 md:px-5 items-center mx-auto', className, {
				'py-8': !useCustomYSpace,
			})}
		>
			{children}
		</Tag>
	);
};

ContentConstraint.displayName = 'ContentConstraint';
