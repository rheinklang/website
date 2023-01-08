import classNames from 'classnames';
import type { FC } from 'react';
import { Badge } from './Badge';
import { Button, ButtonProps } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Heading } from './Heading';
import { Image } from './Image';

export interface HeroProps {
	title: string | JSX.Element;
	text: (string | JSX.Element)[];
	image?: string | null;
	badge?: string;
	primaryCta?: ButtonProps | null;
	secondaryCta?: ButtonProps | null;
	className?: string;
	hasFollowingContent?: boolean;
}

export const Hero: FC<HeroProps> = ({
	title,
	text,
	image,
	badge,
	className,
	hasFollowingContent = false,
	primaryCta,
	secondaryCta,
}) => {
	return (
		<article className={classNames('', className)}>
			<div
				className={classNames(
					'container mx-auto flex px-4 py-16 md:py-24 flex-col-reverse md:flex-row items-center',
					{
						'py-16 md:py-24': !hasFollowingContent,
						'pt-16 pb-4 md:pt-24': hasFollowingContent,
					}
				)}
			>
				<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
					{badge && <Badge className="mb-2">{badge}</Badge>}
					<Heading level="1" className="mb-4">
						{title}
					</Heading>
					{text.map((line, i) => (
						<p key={i} className="mb-8 leading-relaxed w-3/4">
							{line}
						</p>
					))}
					<ButtonGroup>
						{primaryCta && <Button {...primaryCta} />}
						{secondaryCta && <Button {...secondaryCta} type="secondary" />}
					</ButtonGroup>
				</div>
				{image && (
					<div className="lg:max-w-lg lg:w-full md:pb-0 md:w-1/2 w-5/6 pb-8">
						<Image isObjectFitCover className="rounded-xl" src={image} alt={`${title}`} />
					</div>
				)}
			</div>
		</article>
	);
};

Hero.displayName = 'Hero';
