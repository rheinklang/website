import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

export type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export interface HeadingProps extends PropsWithChildren {
	level?: HeadingLevel;
	visualLevel?: HeadingLevel;
	tag?: string;
	className?: string;
}

const mapSizesToLevel: Record<HeadingLevel, string> = {
	1: 'text-3xl sm:text-4xl',
	2: 'text-2xl sm:text-3xl',
	3: 'text-xl sm:text-2xl',
	4: 'text-lg sm:text-xl',
	5: 'text-md sm:text-lg',
	6: 'text-sm sm:text-md',
};

export const Heading: FC<HeadingProps> = ({ children, className, tag, level = '3', visualLevel }) => {
	let Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	if (tag) {
		Tag = tag as 'h1';
	}

	if (!visualLevel) {
		visualLevel = level;
	}

	return <Tag className={classNames('font-bold', mapSizesToLevel[visualLevel], className)}>{children}</Tag>;
};
