import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getAllArticleSlugs, getArticleBySlug } from '../../../api/articles';
import { BlogArticle } from '../../../components/pages/BlogArticle';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const slug = params && params.slug ? `${params.slug}` : undefined;
	const article = await getArticleBySlug(`${slug}`);
	const allSlugs = await getAllArticleSlugs();

	const contentProviderProps = await getContextualContentProviderFetcher('article', {
		title: article.title,
		excerpt: article.excerpt,
	})();

	return {
		props: {
			slug,
			article,
			contentProviderProps,
			count: allSlugs.length,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getAllArticleSlugs();

	return {
		fallback: false,
		paths: slugs.map((slug) => ({
			params: { slug },
		})),
	};
};

const ArticleBySlugPage: NextPage<Awaited<ReturnType<typeof getStaticProps>>['props']> = ({
	article,
	contentProviderProps,
}) => {
	const router = useRouter();

	return (
		<ErrorBoundary route={router.asPath}>
			<Head>
				<meta property="og:type" content="article" />
			</Head>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<BlogArticle article={article} />
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ArticleBySlugPage.displayName = 'ArticleBySlugPage';

export default ArticleBySlugPage;
