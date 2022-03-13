import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { FilterXSS } from 'xss';

export interface RichtextProps {
	as?: string;
	content: string;
	className?: string;
}

export const richtextXSSFilter = new FilterXSS({
	allowCommentTag: false,
	css: false,
});

export const Richtext: FC<RichtextProps> = ({ as = 'div', content, className }) => {
	const Tag = useMemo((): 'div' => as as 'div', [as]);
	const sanitizedContent = useMemo(() => richtextXSSFilter.process(content), [content]);

	return (
		<Tag
			className={classNames('prose lg:prose-xl', className)}
			dangerouslySetInnerHTML={{ __html: sanitizedContent.toString() }}
		/>
	);
};

Richtext.displayName = 'Richtext';
