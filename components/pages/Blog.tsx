import { FilterIcon, SearchIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { getPaginatedArticles } from '../../api/articles';
import {
	BlogArticlesQueryResult,
	useArticlesQuery,
	useBlogArticlesLazyQuery,
	useBlogArticlesQuery,
} from '../../graphql';
import { nonNullish } from '../../utils/filter';
import { ArticleExcerpt } from '../ArticleExcerpt';
import { Button } from '../Button';
import { ContentConstraint } from '../ContentConstraint';
import { ContentHeader } from '../ContentHeader';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';

export enum BlogSort {
	ASCENDING = 'asc',
	DESCENDING = 'desc',
}

export const ARTICLE_PER_PAGE = 10;
export const INITIAL_PAGE_START = 1;

export interface BlogProps {
	count: number;
	initialArticles: Awaited<ReturnType<typeof getPaginatedArticles>>;
}

export const Blog: FC<BlogProps> = ({ count, initialArticles }) => {
	const router = useRouter();
	const pageIndex = router.query.page ? parseInt(router.query.page as string, 10) : INITIAL_PAGE_START;
	const [sort, setSort] = useState<BlogSort>(BlogSort.DESCENDING);
	const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
	const [search, setSearch] = useState<string>('');
	const [articles, setArticles] = useState(initialArticles);
	const [currentPage, setCurrentPage] = useState(pageIndex);
	const [canLoadMore, setCanLoadMore] = useState(true);

	const { data, loading, fetchMore } = useArticlesQuery({
		variables: {
			limit: ARTICLE_PER_PAGE,
			skip: currentPage * ARTICLE_PER_PAGE,
		},
	});

	useEffect(() => {
		fetchMore({
			variables: {
				limit: ARTICLE_PER_PAGE,
				skip: currentPage * ARTICLE_PER_PAGE,
			},
		});
	}, [currentPage, fetchMore]);

	const handleNextPage = useCallback(() => {
		router.query.page = `${currentPage + 1}`;
		router.push(router);
	}, [currentPage, router]);

	return (
		<section className="bg-gray-50">
			<ContentHeader
				title={'Neueste Artikel (' + count + ')'}
				text="Erfahre mehr was in der Welt von Rheinklang aktuell passiert."
			>
				<>
					<div className="mb-4">
						<Input
							placeholder="Suchen ..."
							icon={SearchIcon}
							value={search}
							onChange={(value) => {
								setSearch(value);
							}}
						/>
					</div>
					<div className="w-full flex flex-row flex-nowrap">
						<Dropdown
							placeholder="Kategorie auswählen"
							icon={FilterIcon}
							value={categoryFilter}
							onChange={(value) => {
								setCategoryFilter(value);
							}}
							options={[]}
							// options={articleCategories.map((ac) => ({
							// 	id: ac.slug,
							// 	label: ac.title,
							// }))}
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
					</div>
				</>
			</ContentHeader>

			<div className="py-12">
				<ContentConstraint>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
						{articles.map((article, i) => (
							<ArticleExcerpt
								key={i + article._created + article.slug}
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
					{false && (
						<Button
							isLoading={loading}
							onClick={() => {
								// setCurrentPage(currentPage + 1);
							}}
						>
							Mehr Anzeigen
						</Button>
					)}
				</ContentConstraint>
			</div>
		</section>
	);
};

Blog.displayName = 'Blog';
