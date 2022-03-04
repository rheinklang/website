import { FilterIcon, SearchIcon, SortAscendingIcon, SortDescendingIcon, TagIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getArticleCategoriesForFilter } from '../../api/articles';
import { ArticleExcerpt } from '../../components/ArticleExcerpt';
import { Button } from '../../components/Button';
import { ContentConstraint } from '../../components/ContentConstraint';
import { ContentHeader } from '../../components/ContentHeader';
import { Dropdown } from '../../components/Dropdown';
import { Input } from '../../components/Input';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';

enum BlogSort {
	ASCENDING = 'asc',
	DESCENDING = 'desc',
}

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('blog');
	const contentProviderProps = await getContentProviderProps();
	const articleCategories = await getArticleCategoriesForFilter();

	return {
		props: {
			contentProviderProps,
			articleCategories,
		},
	};
}

const BlogPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	articleCategories,
}) => {
	const [sort, setSort] = useState<BlogSort>(BlogSort.DESCENDING);
	const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
	const [search, setSearch] = useState<string>('');
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<section className="bg-gray-50">
						<ContentHeader
							title="Neueste Artikel"
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
										options={articleCategories.map((ac) => ({
											id: ac.slug,
											label: ac.title,
										}))}
									/>
									<Button
										type="secondary"
										className="ml-2 grow-0 w-1/4 md:w-auto"
										onClick={() =>
											setSort(
												sort === BlogSort.ASCENDING ? BlogSort.DESCENDING : BlogSort.ASCENDING
											)
										}
									>
										{sort === BlogSort.ASCENDING && <SortAscendingIcon className="h-6" />}
										{sort === BlogSort.DESCENDING && <SortDescendingIcon className="h-6" />}
									</Button>
								</div>
							</>
						</ContentHeader>

						<div className="py-12">
							<ContentConstraint className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
								<ArticleExcerpt />
							</ContentConstraint>
							<ContentConstraint className="pt-2 pb-0 flex justify-center">
								<Button
									isLoading={isLoadingMore}
									onClick={() => {
										setIsLoadingMore(true);
										const tid = setTimeout(() => {
											setIsLoadingMore(false);
											clearTimeout(tid);
										}, 1000);
									}}
								>
									Mehr Anzeigen
								</Button>
							</ContentConstraint>
						</div>
					</section>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

BlogPage.displayName = 'BlogPage';

export default BlogPage;
