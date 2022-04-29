import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { getAllArticleSlugs, getPaginatedArticles } from '../../../api/articles';
import { getBlogPage } from '../../../api/pages';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ARTICLE_PER_PAGE, Blog, INITIAL_PAGE_START } from '../../../components/pages/Blog';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getPaginationArray } from '../../../utils/structs';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const page = params && params.page ? parseInt(`${params.page}`, 10) : INITIAL_PAGE_START;
	const slugs = await getAllArticleSlugs();
	const pagination = getPaginationArray(slugs, ARTICLE_PER_PAGE);
	const articles = await getPaginatedArticles(page, ARTICLE_PER_PAGE);
	const pageData = await getBlogPage();

	const getContentProviderProps = getContextualContentProviderFetcher('blog', {
		page: `${page}`,
		pageCount: `${pagination.length}`,
		articleCount: `${articles.length}`,
		totalArticleCount: `${slugs.length}`,
	});
	const contentProviderProps = await getContentProviderProps();

	return {
		props: {
			articles,
			contentProviderProps,
			pagination,
			pageData,
			totalArticlesCount: slugs.length,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getAllArticleSlugs();

	return {
		fallback: false,
		paths: getPaginationArray(slugs, ARTICLE_PER_PAGE).map((page) => ({
			params: { page: `${page}` },
		})),
	};
};

const BlogPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	totalArticlesCount,
	contentProviderProps,
	articles,
	pagination,
	pageData,
}) => {
	const router = useRouter();
	const { page } = router.query;

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<Blog
						title={pageData.title}
						description={pageData.description}
						currentPage={parseInt(`${page}`, 10)}
						totalArticleCount={totalArticlesCount}
						pagination={pagination}
						articles={articles}
					/>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

BlogPage.displayName = 'BlogPage';

export default BlogPage;
