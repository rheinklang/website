// import { HashtagIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC } from 'react';

export interface TagProps {
	title: string;
	prefix?: string;
	className?: string;
}

export const Tag: FC<TagProps> = ({ className, title, prefix }) => (
	<span
		className={classNames(
			'inline-flex items-center uppercase py-1 px-1 rounded-xl text-xs font-medium tracking-widest bg-gray-100 text-gray-400',
			className
		)}
	>
		{prefix && <span className="rounded-full bg-white text-gray-500 px-2 mr-2">{prefix}</span>}
		<span
			className={classNames('pr-2', {
				'pl-2': !prefix,
			})}
		>
			{title}
		</span>
	</span>
);

Tag.displayName = 'Tag';
