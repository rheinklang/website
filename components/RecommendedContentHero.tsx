import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Badge } from './Badge';
import { CalendarIndicator } from './CalendarIndicator';
import { ContentConstraint } from './ContentConstraint';
import { Heading } from './Heading';
import { Link } from './Link';

export interface RecommendedContentHeroProps {
	title: string | JSX.Element;
	text: (string | JSX.Element)[];
	label?: string;
	link?: string;
	date?: string;
	className?: string;
	isEmbeddedInSameColor?: boolean;
	image?: {
		path?: string | null;
	} | null;
}

export const RecommendedContentHero: FC<RecommendedContentHeroProps> = ({
	label,
	title,
	text,
	className,
	date,
	link = '#',
	image = {},
	isEmbeddedInSameColor = false,
}) => {
	const translate = useTranslation();
	const labelOrDefault = useMemo(() => label || translate('common.badge.recommended'), [translate, label]);

	return (
		<ContentConstraint tag="section">
			<Link isPureContent isUnstyled isFlex={false} href={link} className="group">
				<div
					className={classNames(
						'flex transition-colors bg-sea-green-200 rounded-xl group-hover:bg-sea-green-300 p-4 gap-2 md:p-8 md:gap-8 md:items-center lg:p-16',
						className,
						{
							'shadow-sm': !isEmbeddedInSameColor,
						}
					)}
				>
					<div className="xl:w-0 xl:flex-1">
						<hgroup>
							<Badge className="mb-3 md:mb-4">{labelOrDefault}</Badge>
							<Heading level="2">{title}</Heading>
						</hgroup>
						<p className="mt-3 max-w-2xl lg:max-w-3xl text-lg leading-6">{text}</p>
					</div>
					{date && (
						<div className="md:ml-auto">
							<CalendarIndicator date={date} className="shadow-lg" />
						</div>
					)}
				</div>
			</Link>
		</ContentConstraint>
	);
};

RecommendedContentHero.displayName = 'RecommendedContentHero';
