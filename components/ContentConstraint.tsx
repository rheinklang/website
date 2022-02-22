import classNames from 'classnames';
import { FC } from 'react';

interface ContentConstraintProps {
	tag?: string;
	className?: string;
}

export const ContentConstraint: FC<ContentConstraintProps> = ({ children, className, tag = 'div' }) => {
	const Tag = tag as 'div';

	return <Tag className={classNames('container py-8 px-4 mx-auto', className)}>{children}</Tag>;
};

ContentConstraint.displayName = 'ContentConstraint';
