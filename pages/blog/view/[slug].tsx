import type { NextPage, GetStaticPaths, GetStaticPropsContext } from 'next';
import { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { isPast } from 'date-fns';
import { PageLayout } from '../../../components/layouts/PageLayout';
import { ContentProvider, getContextualContentProviderFetcher } from '../../../components/utils/ContentProvider';
import { ErrorBoundary } from '../../../components/utils/ErrorBoundary';
import { compileStringTemplate } from '../../../utils/templating';
import { getAllEventSlugs, getEventBySlug } from '../../../api/events';
import { Richtext } from '../../../components/Richtext';
import { ContentConstraint } from '../../../components/ContentConstraint';
import { formatCreationDate, formatDate, formatDateRange, parseCockpitDate } from '../../../utils/date';
import { Heading } from '../../../components/Heading';
import { Link } from '../../../components/Link';
import { StaticRoutes } from '../../../utils/routes';
import { ArrowLeftIcon, ArrowRightIcon, LinkIcon, ShareIcon, TicketIcon } from '@heroicons/react/outline';
import { ButtonGroup } from '../../../components/ButtonGroup';
import { Button } from '../../../components/Button';
import { getAllArticleSlugs, getArticleBySlug } from '../../../api/articles';
import { useTranslation } from '../../../hooks/useTranslation';
import { Badge } from '../../../components/Badge';

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
	count,
}) => {
	const router = useRouter();
	const translate = useTranslation(contentProviderProps.translations);

	return (
		<ErrorBoundary route={router.asPath}>
			<ContentProvider {...contentProviderProps}>
				<PageLayout
					marketingBanner={contentProviderProps.marketingBanner}
					cta={contentProviderProps.headerConfiguration.cta}
				>
					<ContentConstraint tag="article" className="py-12 md:py-16 lg:py-20 lg:max-w-7xl">
						<Link
							className="text-sea-green-400"
							href={StaticRoutes.BLOG}
							icon={<ArrowLeftIcon className="inline-block h-4 mr-2 align-text-top" />}
							iconPositon="pre"
						>
							Alle Artikel
						</Link>
						<header className="my-8">
							<Badge className="mb-4">{translate(`article.category.${article.category}`)}</Badge>
							<Heading level="1" className="mb-1">
								{article.title}
							</Heading>
							<p className="text-xl text-gray-500">{formatCreationDate(article._created)}</p>
							<p className="text-sm mt-1 text-gray-400">{article.author?.fullName}</p>
						</header>
						<Richtext as="section" content={`${article.content}`} />
						<footer className="mt-8 md:mt-10 lg:mt-16">
							<ButtonGroup className="md:w-fit mt-8 items-start">
								<Button
									link={{
										href: `whatsapp://send?text=${article.title}%20https://rheinklang.events${router.asPath}`,
										action: 'share/whatsapp/share',
										icon: <ShareIcon className="inline h-5 ml-2" />,
									}}
								>
									WhatsApp
								</Button>
							</ButtonGroup>
						</footer>
					</ContentConstraint>
				</PageLayout>
			</ContentProvider>
		</ErrorBoundary>
	);
};

ArticleBySlugPage.displayName = 'ArticleBySlugPage';

export default ArticleBySlugPage;
