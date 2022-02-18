import classNames from 'classnames';
import { Children, FC } from 'react';
import { ContentContainer } from './ContentContainer';

export type ArticleExcerptGridSize = 'small' | 'medium' | 'large';

export interface ArticleExcerptGridProps {
	size?: ArticleExcerptGridSize;
}

const mapSizeToClass: Record<ArticleExcerptGridSize, string> = {
	small: 'w-full md:w-1/4',
	medium: 'w-full md:w-1/3',
	large: 'w-full md:w-1/2',
};

export const ArticleExcerptGrid: FC<ArticleExcerptGridProps> = ({ children, size = 'medium' }) => (
	<section className="text-gray-600 body-font overflow-hidden py-24 bg-gray-50">
		<ContentContainer>
			<div className="flex">
				{Children.map(children, (child: any) => (
					<div className={classNames('pl-4 pr-4', mapSizeToClass[size])}>{child}</div>
				))}
			</div>
		</ContentContainer>
	</section>
);

ArticleExcerptGrid.displayName = 'ArticleExcerptGrid';
