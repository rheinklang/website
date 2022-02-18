import { FC } from 'react';
import classnames from 'classnames';

export interface ContentContainerProps {
	tag?: string;
	isFlexContainer?: boolean;
	itemsAlignment?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
	className?: string;
}

export const ContentContainer: FC<ContentContainerProps> = ({
	children,
	className,
	tag = 'div',
	itemsAlignment = 'center',
	isFlexContainer = false,
}) => {
	const RenderTag = tag as 'h1';

	return (
		<RenderTag
			className={classnames('container mx-auto px-5', className, {
				'flex justify-between': isFlexContainer,
				'items-start': itemsAlignment === 'start',
				'items-end': itemsAlignment === 'end',
				'items-center': itemsAlignment === 'center',
				'items-baseline': itemsAlignment === 'baseline',
				'items-stretch': itemsAlignment === 'stretch',
			})}
		>
			{children}
		</RenderTag>
	);
};

ContentContainer.displayName = 'ContentContainer';
