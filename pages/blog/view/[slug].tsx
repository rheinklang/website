import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageLayout } from '../../../components/layouts/PageLayout';
import {
	ContentProvider,
	ContentProviderStaticSEOVariables,
	getContextualContentProviderFetcher,
} from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { getAllArticleSlugs, getArticleBySlug } from '../../../api/articles';
import { BlogArticle } from '../../../components/pages/BlogArticle';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem';
import { StaticRoutes } from '../../../utils/routes';
import { JsonLd } from '../../../components/utils/JsonLd';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const slug = params && params.slug ? `${params.slug}` : undefined;
	const article = await getArticleBySlug(`${slug}`);
	const allSlugs = await getAllArticleSlugs();

	const contentProviderProps = await getContextualContentProviderFetcher('article', {
		title: article.title,
		excerpt: article.excerpt,
		[ContentProviderStaticSEOVariables.OG_IMAGE]: article.image?.path,
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
				<meta key="og-type" property="og:type" content="article" />
			</Head>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
					festivalRedirect={contentProviderProps.headerConfiguration.festivalRedirect}
				>
					<Breadcrumb>
						<BreadcrumbItem href={`${StaticRoutes.BLOG_PAGE}/1`}>Blog</BreadcrumbItem>
						<BreadcrumbItem>Artikel</BreadcrumbItem>
						<BreadcrumbItem isCurrent href="#">
							{article.title}
						</BreadcrumbItem>
					</Breadcrumb>
					<BlogArticle article={article} />
				</PageLayout>
			</ContentProvider>
			<JsonLd
				schema={{
					'@type': 'NewsArticle',
					datePublished: new Date(article._created).toISOString(),
					headline: article.title,
					author: {
						'@type': 'Person',
						name: article.author?.fullName,
					},
				}}
			/>
		</ErrorBoundary>
	);
};

ArticleBySlugPage.displayName = 'ArticleBySlugPage';

export default ArticleBySlugPage;
