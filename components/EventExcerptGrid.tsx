import classNames from 'classnames';
import { Children, FC } from 'react';
import { ContentContainer } from './ContentContainer';
import { EventExcerpt } from './EventExcerpt';

export type EventExcerptGridSize = 'small' | 'medium' | 'large';

export interface EventExcerptGridProps {
	size?: EventExcerptGridSize;
}

const mapSizeToClass: Record<EventExcerptGridSize, string> = {
	small: 'w-full md:w-1/4',
	medium: 'w-full md:w-1/3',
	large: 'w-full md:w-1/2',
};

export const EventExcerptGrid: FC<EventExcerptGridProps> = ({ children, size = 'medium' }) => (
	<section className="body-font overflow-hidden py-24 bg-sea-green-400">
		<ContentContainer>
			<div className="flex">
				{Children.map(children, (child: any) => (
					<div className={classNames('pl-4 pr-4', mapSizeToClass[size])}>{child}</div>
				))}
			</div>
		</ContentContainer>
	</section>
);
