import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getAllArticleSlugs, getPaginatedArticles } from '../../api/articles';
import { PageLayout } from '../../components/layouts/PageLayout';
import { ARTICLE_PER_PAGE, Blog, INITIAL_PAGE_START } from '../../components/pages/Blog';
import { ContentProvider, getContextualContentProviderFetcher } from '../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../components/utils/ErrorBoundary';

export async function getStaticProps() {
	const getContentProviderProps = getContextualContentProviderFetcher('blog');
	const contentProviderProps = await getContentProviderProps();
	const allSlugs = await getAllArticleSlugs();
	const initialArticles = await getPaginatedArticles(INITIAL_PAGE_START, ARTICLE_PER_PAGE);

	return {
		props: {
			contentProviderProps,
			initialArticles,
			count: allSlugs.length,
		},
	};
}

const BlogPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	contentProviderProps,
	initialArticles,
	count,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<Blog count={count} initialArticles={initialArticles} />
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

BlogPage.displayName = 'BlogPage';

export default BlogPage;
