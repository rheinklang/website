import { FilterIcon, SearchIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { getPaginatedArticles } from '../../api/articles';
import {
	ArticleCategory,
	BlogArticlesQueryResult,
	useArticlesQuery,
	useBlogArticlesLazyQuery,
	useBlogArticlesQuery,
} from '../../graphql';
import { useTranslation } from '../../hooks/useTranslation';
import { nonNullish } from '../../utils/filter';
import { compileStringTemplate } from '../../utils/templating';
import { ArticleExcerpt } from '../ArticleExcerpt';
import { Button } from '../Button';
import { ContentConstraint } from '../ContentConstraint';
import { ContentHeader } from '../ContentHeader';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
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
	// const [sort, setSort] = useState<BlogSort>(BlogSort.DESCENDING);
	// const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
	// const [search, setSearch] = useState<string>('');
	// const translate = useTranslation();
	const templateVariables = {
		currentPage,
		totalArticleCount,
		articleCount: articles.length,
		pageCount: pagination.length,
	};

	return (
		<section className="bg-gray-50">
			<ContentHeader
				title={compileStringTemplate(title, templateVariables)}
				text={description ? compileStringTemplate(description, templateVariables) : undefined}
			>
				<>
					{/* <div className="mb-4">
						<Input
							placeholder="Suchen ..."
							icon={SearchIcon}
							value={search}
							onChange={(value) => {
								setSearch(value);
							}}
						/>
					</div> */}
					{/* <div className="w-full flex flex-row flex-nowrap">
						<Dropdown
							placeholder="Kategorie auswählen"
							icon={FilterIcon}
							value={categoryFilter}
							onChange={(value) => {
								setCategoryFilter(value);
							}}
							options={Object.values(ArticleCategory).map((ac) => ({
								id: ac,
								label: translate(`article.category.${ac}`),
							}))}
						/>
						<Button
							type="secondary"
							className="ml-2 grow-0 w-1/4 md:w-auto"
							onClick={() =>
								setSort(sort === BlogSort.ASCENDING ? BlogSort.DESCENDING : BlogSort.ASCENDING)
							}
						>
							{sort === BlogSort.ASCENDING && <SortAscendingIcon className="h-6" />}
							{sort === BlogSort.DESCENDING && <SortDescendingIcon className="h-6" />}
						</Button>
					</div> */}
				</>
			</ContentHeader>
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
