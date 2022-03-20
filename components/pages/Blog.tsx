import { FC } from 'react';
import { getPaginatedArticles } from '../../api/articles';
import { compileStringTemplate } from '../../utils/templating';
import { ArticleExcerpt } from '../ArticleExcerpt';
import { ContentConstraint } from '../ContentConstraint';
import { ContentHeader } from '../ContentHeader';
import { Pagination } from '../Pagination';

export enum BlogSort {
	ASCENDING = 'asc',
	DESCENDING = 'desc',
}

export const ARTICLE_PER_PAGE = 3;
export const INITIAL_PAGE_START = 1;

export interface BlogProps {
	title: string;
	description?: string | null;
	currentPage: number;
	totalArticleCount: number;
	pagination?: number[];
	articles: Awaited<ReturnType<typeof getPaginatedArticles>>;
}

export const Blog: FC<BlogProps> = ({
	totalArticleCount,
	currentPage,
	title,
	description,
	pagination = [],
	articles,
}) => {
	const templateVariables = {
		currentPage,
		totalArticleCount,
		articleCount: articles.length,
		articleWithPreviousCount: articles.length + (currentPage - 1) * ARTICLE_PER_PAGE,
		pageCount: pagination.length,
	};

	return (
		<section className="bg-gray-50">
			<ContentHeader
				title={compileStringTemplate(title, templateVariables)}
				text={description ? compileStringTemplate(description, templateVariables) : undefined}
			/>
			<div className="py-12">
				<ContentConstraint>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
						{articles.map((article, i) => (
							<ArticleExcerpt
								key={`${article._created}-${article.slug}-${i}`}
								slug={article.slug}
								title={article.title}
								description={article.excerpt}
								authorName={article.author?.fullName || 'Rheinklang Team'}
								authorImage={article.author?.image?.path || 'TODO PLACEHOLDER'}
								creationDate={article._created}
								category={article.category}
								image={article.image?.path || 'TODO FALLBACK'}
								readingTime={article.readingTime}
							/>
						))}
					</div>
				</ContentConstraint>
				<ContentConstraint className="pt-2 pb-0 flex justify-center">
					<Pagination
						count={articles.length}
						totalCount={totalArticleCount}
						pages={pagination}
						currentPage={currentPage}
					/>
				</ContentConstraint>
			</div>
		</section>
	);
};

Blog.displayName = 'Blog';
