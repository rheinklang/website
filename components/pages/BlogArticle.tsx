import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { getArticleBySlug } from '../../api/articles';
import { useTranslation } from '../../hooks/useTranslation';
import { formatCreationDate } from '../../utils/date';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ContentConstraint } from '../ContentConstraint';
import { Heading } from '../Heading';
import { Image } from '../Image';
import { Richtext } from '../Richtext';

export interface BlogArticleProps {
	article: Awaited<ReturnType<typeof getArticleBySlug>>;
}

export const BlogArticle: FC<BlogArticleProps> = ({ article }) => {
	const translate = useTranslation();
	const router = useRouter();

	return (
		<ContentConstraint tag="article" className="py-12 md:py-16 lg:py-20 lg:max-w-7xl">
			<span
				role="link"
				className="inline-flex transition-all cursor-pointer text-sea-green-400 hover:text-sea-green-200"
				onClick={() => router.back()}
			>
				<ArrowLeftIcon className="inline-block h-5 mr-2 align-text-top" /> Alle Artikel
			</span>
			<header className="my-8">
				<Badge className="mb-4">{translate(`article.category.${article.category}`)}</Badge>
				<Heading level="1" className="mb-1">
					{article.title}
				</Heading>
				<p className="text-xl text-gray-500">{formatCreationDate(article._created)}</p>
				{article.author && (
					<div className="inline-flex flex-row items-center py-2 pl-4 pr-8 mt-4 rounded-full flex-nowrap bg-gray-50">
						{article.author.image && (
							<Image
								preset="thumbnail"
								className="flex-shrink-0 object-cover object-center w-12 h-12 rounded-full"
								src={article.author.image?.path}
								alt={article.author.fullName}
							/>
						)}
						<div>
							<p className="ml-2 text-sm text-gray-400">Publiziert von</p>
							<p className="ml-2 text-md">{article.author.fullName}</p>
						</div>
					</div>
				)}
			</header>
			<Richtext as="section" content={`${article.content}`} />
			<footer className="mt-8 md:mt-10 lg:mt-16">
				<ButtonGroup className="items-start mt-8 md:w-fit">
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
	);
};
