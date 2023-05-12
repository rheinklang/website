import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { FilterXSS, IFilterXSSOptions } from 'xss';

export interface RichtextProps {
	as?: string;
	content: string;
	className?: string;
	filter?: FilterXSS;
	useCustomSizing?: boolean;
}

const defaultOptions: IFilterXSSOptions = {
	allowCommentTag: false,
	css: false,
	whiteList: {
		h1: [],
		h2: [],
		h3: [],
		h4: [],
		h5: [],
		h6: [],
		p: [],
		div: [],
		strong: [],
		span: [],
		em: [],
		b: [],
		i: [],
		a: ['href', 'alt'],
		ul: [],
		ol: [],
		dl: [],
		dt: [],
		dd: [],
		q: [],
		blockquote: [],
		br: [],
		li: [],
		img: ['src', 'alt'],
		table: [],
		thead: [],
		tbody: [],
		tr: [],
		td: [],
		th: [],
	},
};

export const richtextXSSFilter = new FilterXSS(defaultOptions);

export const richtextWithIdMarksXSSFilter = new FilterXSS({
	...defaultOptions,
	whiteList: {
		...defaultOptions.whiteList,
		h1: ['id'],
		h2: ['id'],
		h3: ['id'],
		h4: ['id'],
		h5: ['id'],
		h6: ['id'],
		p: ['id'],
		div: ['id'],
	},
});

export const Richtext: FC<RichtextProps> = ({
	as = 'div',
	useCustomSizing = false,
	content,
	className,
	filter = richtextXSSFilter,
}) => {
	const Tag = useMemo((): 'div' => as as 'div', [as]);
	const sanitizedContent = useMemo(() => filter.process(content), [filter, content]);

	return (
		<Tag
			className={classNames('prose prose-neutral', className, {
				'lg:prose-lg xl:prose-xl': useCustomSizing === true,
			})}
			dangerouslySetInnerHTML={{ __html: sanitizedContent.toString() }}
		/>
	);
};

Richtext.displayName = 'Richtext';
