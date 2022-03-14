import { ArrowRightIcon, ClockIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { formatCreationDate, formatRelativeDate } from '../utils/date';
import { StaticRoutes } from '../utils/routes';
import { Badge } from './Badge';
import { Image } from './Image';

export interface ArticleExcerptProps {
	image: string;
	slug: string;
	category: string;
	title: string;
	description: string;
	readingTime?: number | null;
	authorName: string;
	authorImage: string;
	creationDate?: number;
	className?: string;
}

export const ArticleExcerpt: FC<ArticleExcerptProps> = ({
	title,
	description,
	image,
	readingTime,
	category,
	authorName,
	authorImage,
	creationDate,
	slug,
	className,
}) => {
	const translate = useTranslation();

	return (
		<article className={classNames('flex flex-col items-start rounded-xl bg-white shadow-sm', className)}>
			<div className="w-full h-64 lg:h-80">
				<Image
					preset="teaser"
					className="w-full h-64 object-cover rounded-t-xl lg:h-80"
					alt={'image'}
					src={image}
				/>
			</div>
			<div className="p-8 sm:p-4 md:p-8 w-full flex flex-col h-full">
				<Badge>{translate(`article.category.${category}`)}</Badge>
				<h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{title}</h2>
				<p className="leading-relaxed mb-8">{description}</p>
				<div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
					<Link href={`${StaticRoutes.BLOG}/view/${slug}`}>
						<a className="group transition-all text-sea-green-400 inline-flex items-center hover:border-sea-green-600 hover:text-sea-green-600">
							Weiterlesen
							<ArrowRightIcon className="transition-all w-4 h-4 ml-1 group-hover:ml-2" />
						</a>
					</Link>
					<span className="text-gray-400 inline-flex items-center ml-auto leading-none text-sm py-1 ">
						{/* mr-3 pr-3 border-r-2 border-gray-200 */}
						{readingTime && (
							<>
								<ClockIcon className="w-4 h-4 mr-1" />
								{readingTime} MIN
							</>
						)}
					</span>
				</div>
				<a className="inline-flex items-center">
					<Image
						preset="thumbnail"
						className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
						src={authorImage}
						alt={authorName}
					/>

					<span className="flex-grow flex flex-col pl-4">
						<span className="title-font font-medium text-gray-900">{authorName}</span>
						<span className="text-gray-400 text-xs tracking-widest mt-0.5">
							{creationDate ? formatCreationDate(creationDate) : ''}
						</span>
					</span>
				</a>
			</div>
		</article>
	);
};

ArticleExcerpt.displayName = 'ArticleExcerpt';
